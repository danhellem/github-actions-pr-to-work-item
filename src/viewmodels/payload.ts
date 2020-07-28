export default class Payload {
  constructor() {
    this.action = ''
    this.number = -1
    this.url = ''
    this.title = ''
    this.merged = false
    this.repo_fullname = ''
    this.repo_name = ''
    this.repo_url = ''
    this.repo_owner = ''
    this.body = ''
    this.sender_login = ''
  }

  action: string
  number?: number
  url: string
  title: string
  merged: boolean
  repo_fullname: string
  repo_name: string
  repo_url: string
  repo_owner: string
  body: string
  sender_login: string
}
