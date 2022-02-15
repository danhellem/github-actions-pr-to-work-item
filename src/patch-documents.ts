import {JsonPatchDocument} from 'azure-devops-node-api/interfaces/common/VSSInterfaces'
import {WorkItem} from 'azure-devops-node-api/interfaces/WorkItemTrackingInterfaces'

import EnvInputs from './viewmodels/env-inputs'
import Payload from './viewmodels/payload'
import {IResponse} from './interfaces/base-response'

export function openedPatchDocument(env: EnvInputs): IPatchDocumentResponse {
  const response: IPatchDocumentResponse = {
    code: 200,
    message: 'Success',
    success: true,
    patchDocument: undefined
  }

  let patchDocument: JsonPatchDocument = []

  patchDocument = [
    {
      op: 'add',
      path: '/fields/System.State',
      value: env.ado_active_state
    }
  ]

  response.patchDocument = patchDocument

  return response
}

export function editedPatchDocument(
  env: EnvInputs,
  payload: Payload,
  workItem: WorkItem
): IPatchDocumentResponse {
  const response: IPatchDocumentResponse = {
    code: 500,
    message: 'failed',
    success: false,
    patchDocument: undefined
  }

  let patchDocument: JsonPatchDocument = []

  const system_title: string = workItem.fields
    ? workItem.fields['System.Title']
    : ''
  const system_description: string = workItem.fields
    ? workItem.fields['System.Description']
    : ''

  payload.body = payload.body.replace(`\r\nAB#${workItem.id}`, '')

  const pr_title = `${payload.title} (GitHub PR #${payload.number})`
  const pr_desc = `${payload.body.trim()}<br><br>GitHub <a href="${
    payload.url
  }">Pull Request #${payload.number}</a> created in <a href="${
    payload.repo_url
  }">${payload.repo_fullname}</a>`

  if (system_title === pr_title && system_description === pr_desc) {
    response.code = 200
    response.message = 'No updates made to work item title or description'
    response.success = true
    response.patchDocument = undefined

    return response
  }

  patchDocument = [
    {
      op: 'add',
      path: '/fields/System.Title',
      value: pr_title
    },
    {
      op: 'add',
      path: '/fields/System.History',
      value: pr_desc
    }
  ]

  response.code = 200
  response.message = 'Success'
  response.success = true
  response.patchDocument = patchDocument

  return response
}

export function closedPatchDocument(
  env: EnvInputs,
  payload: Payload
): IPatchDocumentResponse {
  const response: IPatchDocumentResponse = {
    code: 500,
    message: 'failed',
    success: false,
    patchDocument: undefined
  }

  const pr_desc = `GitHub <a href="${payload.url}">Pull Request #${payload.number}</a> was closed`

  let patchDocument: JsonPatchDocument = []

  patchDocument = [
    {
      op: 'add',
      path: '/fields/System.State',
      value: env.ado_close_state
    },
    {
      op: 'add',
      path: '/fields/System.Description',
      value: pr_desc
    }
  ]

  response.code = 200
  response.message = 'Success'
  response.success = true
  response.patchDocument = patchDocument

  return response
}

export interface IPatchDocumentResponse extends IResponse {
  patchDocument: JsonPatchDocument | undefined
}
