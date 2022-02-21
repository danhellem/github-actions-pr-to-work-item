import {JsonPatchDocument} from 'azure-devops-node-api/interfaces/common/VSSInterfaces'
import {WorkItem} from 'azure-devops-node-api/interfaces/WorkItemTrackingInterfaces'
import showdown from 'showdown'

import EnvInputs from './viewmodels/env-inputs'
import Payload from './viewmodels/payload'
import {IResponse} from './interfaces/base-response'

export function openedPatchDocument(env: EnvInputs): IPatchDocumentResponse {
  const response: IPatchDocumentResponse = { code: 200, message: 'Success', success: true, patchDocument: undefined }
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

export function editedPatchDocument(env: EnvInputs, payload: Payload, workItem: WorkItem): IPatchDocumentResponse {
  const response: IPatchDocumentResponse = { code: 500, message: 'failed', success: false, patchDocument: undefined }
  let patchDocument = []

  const wi_title: string = workItem.fields ? workItem.fields['System.Title'] : ''
  const wi_description: string = workItem.fields ? workItem.fields['System.Description']: ''
  const wi_reprosteps: string = workItem.fields ? workItem.fields['Microsoft.VSTS.TCM.ReproSteps']: ''
 
  const body = payload.body.replace(`AB#${workItem.id}`, '').trim();
  const converter = new showdown.Converter();
  const html = converter.makeHtml(body);  

  const pr_title = `${payload.title} (GitHub PR #${payload.number})`
 
  if (wi_title != pr_title) {
    patchDocument.push({
      op: "add",
      path: "/fields/System.Title",
      value: pr_title,
    });
  }

  if (wi_description != html || wi_reprosteps != html ) {
    patchDocument.push(
      {
        op: "add",
        path: "/fields/System.Description",
        value: html,
      },
      {
        op: "add",
        path: "/fields/Microsoft.VSTS.TCM.ReproSteps",
        value: html,
      }
    );
  }

  if (patchDocument.length <= 0) {
    response.code = 200
    response.message = 'No updates made to work item title or description'
    response.success = true
    response.patchDocument = undefined

    return response
  } 

  response.code = 200
  response.message = 'Success'
  response.success = true
  response.patchDocument = patchDocument

  return response
}

export function closedPatchDocument(env: EnvInputs, payload: Payload): IPatchDocumentResponse {  
  const response: IPatchDocumentResponse = { code: 500, message: 'failed', success: false, patchDocument: undefined }
  const pr_comment = `GitHub <a href="${payload.url}">Pull Request #${payload.number}</a> was closed`
  let patchDocument: JsonPatchDocument = []

  patchDocument = [
    {
      op: 'add',
      path: '/fields/System.State',
      value: env.ado_close_state
    },
    {
      op: 'add',
      path: '/fields/System.History',
      value: pr_comment
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
