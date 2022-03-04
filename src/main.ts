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

let verbose_logging = false
const local_debug = false // set to true to fetch webhook json from local payload. For local debugging only!!
const ado_org = '{organization}'
const ado_project = '{project name}'
const ado_token = '{azure devops personal access token}'
const ado_wit = 'User Story'
const ado_active_state = 'Active'
const ado_close_state = 'Close'
const github_token = '{github token}'
const ado_area_path = ''

// prettier-ignore
function getEnvInputs(): EnvInputs {
  const env: EnvInputs = new EnvInputs()

  env.ado_token = process.env['ado_token'] !== undefined ? process.env['ado_token'] : ado_token
  env.ado_organization = process.env['ado_organization'] !== undefined ? process.env['ado_organization'] : ado_org
  env.ado_project = process.env['ado_project'] !== undefined ? process.env['ado_project'] : ado_project
  env.ado_wit = process.env['ado_wit'] !== undefined ? process.env['ado_wit'] : ado_wit
  env.ado_close_state = process.env['ado_close_state'] !== undefined ? process.env['ado_close_state'] : ado_close_state
  env.ado_active_state = process.env['ado_active_state'] !== undefined ? process.env['ado_active_state'] : ado_active_state
  env.github_token = process.env['github_token'] !== undefined ? process.env['github_token'] : github_token
  env.ado_area_path = process.env['ado_area_path'] !== undefined ? process.env['ado_area_path'] : ado_area_path  
  if (! verbose_logging) verbose_logging = process.env['debug'] !== undefined ? true : false

  if (!env.ado_token) { console.log('  Missing ado_token value') } 
  if (!env.ado_organization) { console.log('  Missing ado_organization value') } 
  if (!env.ado_project) { console.log('  Missing ado_project value') } 
  if (!env.ado_wit) { console.log('  Missing ado_wit value') }   
  if (!env.github_token) { console.log('  Missing github_token value') }  

  return env
}

// prettier-ignore
function getWebHookPayLoad(): Payload {
  const body: WebhookPayload = (context !== undefined && !local_debug) ? context.payload : sampleWebHookPayload
  const payload: Payload = new Payload()  

  payload.action = body.action !== undefined ? body.action : ''
  payload.number = body.pull_request?.number !== undefined ? body.pull_request?.number : -1
  payload.title = body.pull_request !== undefined ? body.pull_request['title'] : ''
  payload.url = body.pull_request?.html_url !== undefined ? body.pull_request.html_url : ''
  payload.merged = body['merged'] !== undefined ? body['merged'] : false
  payload.repo_name = body.repository?.name !== undefined ? body.repository.name : ''
  payload.repo_url = body.repository?.html_url !== undefined ? body.repository.html_url : ''
  payload.repo_fullname = body.repository?.full_name !== undefined ? body.repository.full_name : ''
  payload.repo_owner = body.repository?.owner !== undefined ? body.repository.owner.login : ''
  payload.sender_login = body.sender?.login !== undefined ? body.sender.login : ''  
  payload.body = body.pull_request != undefined && body.pull_request.body != undefined ? body.pull_request.body : ''

  return payload
}

async function run(): Promise<void> {
  if (verbose_logging) console.log('WARNING! Verbose logging is turned on.');
  
  try {
    let workItem: WorkItem | null
    let workItemId: number

    console.log('Getting environmental variables...')

    // set the env params
    const envInputs: EnvInputs = getEnvInputs()
    if (verbose_logging) console.log(envInputs)

    console.log('Getting payload values...')

    // get payload info
    const payload: Payload = getWebHookPayLoad()
    if (verbose_logging) console.log(payload)

    if (payload.sender_login === 'azure-boards[bot]') {
      console.log(`azure-boards[bot] sender, exiting action`)
      return
    }

    console.log('Fetching id from work items...')

    // go and see if the ado work item already exists for this PR
    const fetchResult = await fetch(envInputs, payload)
    if (verbose_logging) console.log(fetchResult)

    const response: IResponse = {code: 500, message: 'failed', success: false}

    // check to make sure your fetch was a success
    // success = return an work item or return a zero result
    if (!fetchResult.success) {
      core.setFailed(`Error fetching work item from Azure DevOps: ${fetchResult.message}`)
      return
    }

    // if a work item is not found then lets go create one
    if (fetchResult.code === 404) {
      console.log('Work item does not exist, creating new one...')

      // create work item
      const createResult = await create(envInputs, payload)

      if (verbose_logging) console.log(createResult)

      // if we successfully created the work item, then go and
      // link the PR in GitHub to the PR work item in ADO
      if (createResult.success) {
        console.log('  create successfull')

        workItem = createResult.workItem
        workItemId = workItem?.id !== undefined ? workItem?.id : -1

        const pr: IResponse = envInputs.github_token !== '' ? await updatePr(payload, envInputs.github_token, workItem?.id !== undefined ? workItem.id : -1) : response

        if (verbose_logging) console.log(pr)

        if (!pr.success) console.log(`Warning: ${pr.message}`)
      } else {
        core.setFailed(`Error creating work item in Azure DevOps: ${createResult.message}`)
        return
      }
    } else {
      workItem = fetchResult.workItem
      workItemId = workItem?.id !== undefined ? workItem?.id : -1

      console.log(`  Existing work item found: ${workItem?.id}`)
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
        const patchDocumentResponse: patch.IPatchDocumentResponse = patch.openedPatchDocument(envInputs)

        // go update the work item to change the state
        // this gets the PR out of the new column and into something more actionable
        if (patchDocumentResponse.success && patchDocumentResponse !== undefined) {
          const openedResult = await update(envInputs, workItemId, patchDocumentResponse.patchDocument)

          if (verbose_logging) console.log(openedResult)
        }

        break
      }

      case 'edited': {
        const patchDocumentResponse: patch.IPatchDocumentResponse = patch.editedPatchDocument(envInputs, payload, workItem)

        // if success and patch document is not empty, then go update the work item
        if (patchDocumentResponse.success && patchDocumentResponse !== undefined) {
          const updateResult = await update(envInputs, workItemId, patchDocumentResponse.patchDocument)

          if (verbose_logging) console.log(updateResult)
        }

        break
      }

      case 'closed': {
        const patchDocumentResponse: patch.IPatchDocumentResponse = patch.closedPatchDocument(envInputs, payload)

        // if success and patch document is not empty, then go update the work item
        if (patchDocumentResponse.success && patchDocumentResponse !== undefined) {
          const closedResult = await update(envInputs, workItemId, patchDocumentResponse.patchDocument)

          if (verbose_logging) console.log(closedResult)
        }

        break
      }
    }
  } catch (err) {
    core.setFailed(JSON.stringify(err))
  }
}

run()
