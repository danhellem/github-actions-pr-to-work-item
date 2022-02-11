import * as azdev from 'azure-devops-node-api'
import {IWorkItemTrackingApi} from 'azure-devops-node-api/WorkItemTrackingApi'
import {
  WorkItem,
  WorkItemQueryResult,
  WorkItemReference
} from 'azure-devops-node-api/interfaces/WorkItemTrackingInterfaces'

import {IResponse} from './interfaces/base-response'
import Payload from './viewmodels/payload'
import EnvInputs from './viewmodels/env-inputs'
import {JsonPatchDocument} from 'azure-devops-node-api/interfaces/common/VSSInterfaces'

export async function fetch(
  env: EnvInputs,
  payload: Payload
): Promise<IFetchResponse> {
  const response: IFetchResponse = {
    code: 500,
    message: 'failed',
    success: false,
    workItem: null
  }

  const authHandler = azdev.getPersonalAccessTokenHandler(env.ado_token)
  const connection = new azdev.WebApi(
    `https://dev.azure.com/${env.ado_organization}`,
    authHandler
  )

  try {
    response.code = 500
    response.message = 'Error calling getWorkItemTrackingApi: '
    const client: IWorkItemTrackingApi = await connection.getWorkItemTrackingApi()

    const teamContext = {project: env.ado_project}

    //build wiql
    const wiql = {
      query: `SELECT [System.Id], [System.WorkItemType], [System.Description], [System.Title], [System.AssignedTo], [System.State], [System.Tags] FROM workitems WHERE [System.TeamProject] = @project AND [System.Title] CONTAINS '(GitHub PR #${payload.number})' AND [System.Tags] CONTAINS 'GitHub PR' AND [System.Tags] CONTAINS '${payload.repo_name}'`
    }

    response.code = 500
    response.message = 'Error calling queryByWiql: '

    const queryResult: WorkItemQueryResult = await client.queryByWiql(
      wiql,
      teamContext
    )

    // if query results = null then i think we have issue with the project name
    if (queryResult === null) {
      response.code = 500
      response.message =
        'Error empty queryResult: Project name appears to be invalid or query is not formed correctly'
      return response
    }

    // check to see if the query returned any results
    const workItemReference: WorkItemReference | null =
      queryResult.workItems !== null && queryResult.workItems !== undefined
        ? queryResult.workItems[0]
        : null

    // if we have results, fetch the work item
    if (workItemReference !== null && workItemReference !== undefined) {
      response.code = 500
      response.message = 'Error calling getWorkItem: '

      // fetch work item by id
      const item: WorkItem = await client.getWorkItem(
        workItemReference.id !== undefined ? workItemReference.id : 0,
        undefined,
        undefined,
        undefined,
        env.ado_project
      )

      response.code = 200
      response.message = 'Success'
      response.success = true
      response.workItem = item
    } else {
      // work item not found, return a 404 code
      // this is okay and still successfull
      response.code = 404
      response.message = 'Work item not found'
      response.success = true
      response.workItem = null
    }

    return response
  } catch (ex) {
    response.message = response.message.concat(JSON.stringify(ex))
    response.workItem = null
    response.success = false

    return response
  }
}

export async function create(
  env: EnvInputs,
  payload: Payload
): Promise<IFetchResponse> {
  const response: IFetchResponse = {
    code: 500,
    message: 'failed',
    success: false,
    workItem: null
  }

  // prettier-ignore
  const patchDocument: JsonPatchDocument | any = [
    {
      op: 'add',
      path: '/fields/System.Title',
      value: `${payload.title} (GitHub PR #${payload.number})`
    },
    {
      op: 'add',
      path: '/fields/System.Tags',
      value: `GitHub PR; ${payload.repo_name}`
    },
    {
      op: 'add',
      path: '/fields/System.History',
      value: `GitHub <a href="${payload.url}" target="_new">Pull Request #${payload.number}</a> created in <a href="${payload.repo_url}" target="_new">${payload.repo_fullname}</a>`
    },
    {
      op: "add",
      path: "/fields/System.Description",
      value: `${payload.body.trim()}<br /><br />GitHub <a href="${payload.url}" target="_new">Pull Request #${payload.number}</a> created in <a href="${payload.repo_url}" target="_new">${payload.repo_fullname}</a>`
    },
    {
      op: 'add',
      path: '/relations/-',
      value: {
        rel: 'Hyperlink',
        url: payload.url
      }
    }
  ]

  if (env.ado_area_path != "") {
    patchDocument.push({
      op: "add",
      path: "/fields/System.AreaPath",
      value: env.ado_area_path
    });
  }

  const authHandler = azdev.getPersonalAccessTokenHandler(env.ado_token)
  const connection = new azdev.WebApi(
    `https://dev.azure.com/${env.ado_organization}`,
    authHandler
  )

  try {
    response.message = 'Error calling getWorkItemTrackingApi: '
    const client: IWorkItemTrackingApi = await connection.getWorkItemTrackingApi()

    //create work item
    const workItem: WorkItem = await client.createWorkItem(
      [],
      patchDocument,
      env.ado_project,
      env.ado_wit,
      false,
      false
    )

    // check to see if the work item is null or undefined
    if (workItem === null || workItem === undefined) {
      response.message =
        'Error creating work item: Work item is null or undefined'
    } else {
      response.code = 200
      response.message = 'Success'
      response.success = true
      response.workItem = workItem
    }

    return response
  } catch (ex) {
    response.message = response.message.concat(JSON.stringify(ex))
    response.workItem = null
    response.success = false

    return response
  }
}

export async function update(
  env: EnvInputs,
  workItemId: number,
  patchDocument: JsonPatchDocument | undefined
): Promise<IFetchResponse> {
  const response: IFetchResponse = {
    code: 500,
    message: 'failed',
    success: false,
    workItem: null
  }

  if (patchDocument === undefined) {
    return response
  }

  const authHandler = azdev.getPersonalAccessTokenHandler(env.ado_token)
  const connection = new azdev.WebApi(
    `https://dev.azure.com/${env.ado_organization}`,
    authHandler
  )

  try {
    response.message = 'Error calling getWorkItemTrackingApi: '
    const client: IWorkItemTrackingApi = await connection.getWorkItemTrackingApi()

    //create work item
    const workItemResult: WorkItem = await client.updateWorkItem(
      [],
      patchDocument,
      workItemId,
      env.ado_project,
      false,
      false
    )

    // check to see if the work item is null or undefined
    if (workItemResult === null || workItemResult === undefined) {
      response.message =
        'Error updating work item: Work item result is null or undefined'
    } else {
      response.code = 200
      response.message = 'Success'
      response.success = true
      response.workItem = workItemResult
    }

    return response
  } catch (ex) {
    response.message = response.message.concat(JSON.stringify(ex))
    response.workItem = null
    response.success = false

    return response
  }
}

interface IFetchResponse extends IResponse {
  workItem: WorkItem | null
}
