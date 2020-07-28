import * as core from '@actions/core'
import {context} from '@actions/github'
import {WebhookPayload} from '@actions/github/lib/interfaces'
import {WorkItem} from 'azure-devops-node-api/interfaces/WorkItemTrackingInterfaces'

import EnvInputs from './viewmodels/env-inputs'
import Payload from './viewmodels/payload'
import sampleWebHookPayload from './debug/sample.webhookpayload'
import {fetch, create, update} from './workitems'
import {update as updatePr} from './github-pr'
import {IResponse} from './interfaces/base-response'
import * as patch from './patch-documents'

const debug = false
const ado_org = ''
const ado_project = ''
const ado_token = ''
const ado_wit = 'Pull Request'
const github_token = ''

// prettier-ignore
function getEnvInputs(): EnvInputs {
  const vm: EnvInputs = new EnvInputs()

  vm.ado_token = process.env['ado_token'] !== undefined ? process.env['ado_token'] : ado_token
  vm.ado_organization = process.env['ado_organization'] !== undefined ? process.env['ado_organization'] : ado_org
  vm.ado_project = process.env['ado_project'] !== undefined ? process.env['ado_project'] : ado_project
  vm.ado_wit = process.env['ado_wit'] !== undefined ? process.env['ado_wit'] : ado_wit
  vm.ado_close_state = process.env['ado_close_state'] !== undefined ? process.env['ado_close_state'] : 'Closed'
  vm.ado_active_state = process.env['ado_active_state'] !== undefined ? process.env['ado_active_state'] : 'Active'
  vm.github_token = process.env['github_token'] !== undefined ? process.env['github_token'] : github_token

  return vm
}

// prettier-ignore
function getWebHookPayLoad(): Payload {
  const body: WebhookPayload = (context !== undefined && !debug) ? context.payload : sampleWebHookPayload
  const vm: Payload = new Payload()

  vm.action = body.action !== undefined ? body.action : ''
  vm.number = body.pull_request?.number !== undefined ? body.pull_request?.number : -1
  vm.title = body.pull_request !== undefined ? body.pull_request['title'] : ''
  vm.url = body.pull_request?.html_url !== undefined ? body.pull_request.html_url : ''
  vm.merged = body['merged'] !== undefined ? body['merged'] : false
  vm.repo_name = body.repository?.name !== undefined ? body.repository.name : ''
  vm.repo_url = body.repository?.html_url !== undefined ? body.repository.html_url : ''
  vm.repo_fullname = body.repository?.full_name !== undefined ? body.repository.full_name : ''
  vm.repo_owner = body.repository?.owner !== undefined ? body.repository.owner.login : ''
  vm.sender_login = body.sender?.login !== undefined ? body.sender.login : ''
  vm.body = body.pull_request?.body !== undefined ? body.pull_request?.body : ''

  vm.body = vm.body.replace(new RegExp('\\r?\\n','g'), '<br />')

  return vm
}

async function run(): Promise<void> {
  try {
    let workItem: WorkItem | null
    let workItemId: number

    // set the env params
    const envInputs: EnvInputs = getEnvInputs()
    if (debug) console.log(envInputs)

    // get payload info
    const payload: Payload = getWebHookPayLoad()
    if (debug) console.log(payload)

    if (payload.sender_login === 'azure-boards[bot]') {
      console.log(`azure-boards[bot] sender, exiting action`)
      return
    }

    // go and see if the ado work item already exists for this PR
    const fetchResult = await fetch(envInputs, payload)
    if (debug) console.log(fetchResult)

    const response: IResponse = {
      code: 500,
      message: 'failed',
      success: false
    }

    // check to make sure your fetch was a success
    // success = return an work item or return a zero result
    if (!fetchResult.success) {
      core.setFailed(
        `Error fetching work item from Azure DevOps: ${fetchResult.message}`
      )
      return
    }

    // if a work item is not found then lets go create one
    if (fetchResult.code === 404) {
      // create work item
      const createResult = await create(envInputs, payload)

      if (debug) console.log(createResult)

      // if we successfully created the work item, then go and
      // link the PR in GitHub to the PR work item in ADO
      if (createResult.success) {
        workItem = createResult.workItem
        workItemId = workItem?.id !== undefined ? workItem?.id : -1

        const pr: IResponse =
          envInputs.github_token !== ''
            ? await updatePr(
                payload,
                envInputs.github_token,
                workItem?.id !== undefined ? workItem.id : -1
              )
            : response

        if (debug) console.log(pr)

        if (!pr.success) console.log(`Warning: ${pr.message}`)
      } else {
        core.setFailed(
          `Error creating work item in Azure DevOps: ${createResult.message}`
        )
        return
      }
    } else {
      workItem = fetchResult.workItem
      workItemId = workItem?.id !== undefined ? workItem?.id : -1

      console.log(`Existing work item found: ${workItem?.id}`)
    }

    // for some reason workItem is still null
    // should never happen
    if (workItem === null) {
      core.setFailed(`Work item object is still null. Exiting run`)
      return
    }

    // check the action type and go do specific updates
    switch (payload.action) {
      case 'opened': {
        const patchDocumentResponse: patch.IPatchDocumentResponse = patch.openedPatchDocument(
          envInputs
        )

        // go update the work item to change the state
        // this gets the PR out of the new column and into something more actionable
        if (
          patchDocumentResponse.success &&
          patchDocumentResponse !== undefined
        ) {
          const openedResult = await update(
            envInputs,
            workItemId,
            patchDocumentResponse.patchDocument
          )

          if (debug) console.log(openedResult)
        }

        break
      }

      case 'edited': {
        const patchDocumentResponse: patch.IPatchDocumentResponse = patch.editedPatchDocument(
          envInputs,
          payload,
          workItem
        )

        // if success and patch document is not empty, then go update the work item
        if (
          patchDocumentResponse.success &&
          patchDocumentResponse !== undefined
        ) {
          const updateResult = await update(
            envInputs,
            workItemId,
            patchDocumentResponse.patchDocument
          )

          if (debug) console.log(updateResult)
        }

        break
      }

      case 'closed': {
        const patchDocumentResponse: patch.IPatchDocumentResponse = patch.closedPatchDocument(
          envInputs
        )

        // if success and patch document is not empty, then go update the work item
        if (
          patchDocumentResponse.success &&
          patchDocumentResponse !== undefined
        ) {
          const closedResult = await update(
            envInputs,
            workItemId,
            patchDocumentResponse.patchDocument
          )

          if (debug) console.log(closedResult)
        }

        break
      }
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
