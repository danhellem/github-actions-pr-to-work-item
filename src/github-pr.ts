import {GitHub} from '@actions/github'
import Payload from './viewmodels/payload'
import {IResponse} from './interfaces/base-response'

export async function update(payload: Payload, token: string, workItemId: number): Promise<IResponse> {
  const response: IResponse = { code: 500, message: 'failed', success: false }
  const n = payload.body.includes(`AB#${workItemId}`)

  if (!n) {
    const octokit = new GitHub(token)
    payload.body = payload.body.concat(`\r\n\r\nAB#${workItemId}`)

    try {
      const result = await octokit.pulls.update({
        owner: payload.repo_owner,
        repo: payload.repo_name,
        body: payload.body,
        pull_number: payload.number !== undefined ? payload.number : -1
      })

      if (result.status === 200) {
        response.code = 200
        response.message = 'Success'
        response.success = true
      }
    } catch (error) {
      response.message = JSON.stringify(error)
    }
  } else {
    response.code = 200
    response.message = `AB#${workItemId} already exists`
    response.success = true
  }

  return response
}
