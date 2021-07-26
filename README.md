![build-test](https://github.com/danhellem/github-actions-pr-to-work-item/workflows/build-test/badge.svg?branch=master)

# Sync GitHub Pull Requests to Azure DevOps

Create a Pull Request in GitHub and have that Pull Request show up on Azure Boards

Update the Pull Request description will update the Pull Request in Azure Boards

Complete the Pull Request in GitHub will close the Pull Request in Azure DevOps

![alt text](./misc/pr-to-azure-boards.gif "animated demo")

## Outputs
The id of the work item created or update

## Example usage

1. Add a secret named `ADO_PERSONAL_ACCESS_TOKEN` containing an [Azure Personal Access Token](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate) with "read & write" permission for Work Items

2. Add an optional secret named `GH_PERSONAL_ACCESS_TOKEN` containing a [GitHub Personal Access Token](https://help.github.com/en/enterprise/2.17/user/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) with "repo" permissions. See optional information below.

3. Install the [Azure Boards App](https://github.com/marketplace/azure-boards) from the GitHub Marketplace

4. Add a workflow file which responds to pull request events of `opened, edited, closed`

   - Set Azure DevOps organization and project details.
   - Set specific work item type settings (work item type, new state, active state, closed state)

   Optional Env Variables

   - `github_token`: Used to update the Issue with AB# syntax to link the work item to the issue. This will only work if the project is configured to use the [GitHub Azure Boards](https://github.com/marketplace/azure-boards) app.

```yaml
name: Sync Pull Request to Azure Boards

on:
  pull_request:
    types: [opened, edited, closed]
    branches:
      - master

jobs:
  alert:
    runs-on: ubuntu-latest
    steps:
    - uses: danhellem/github-actions-pr-to-work-item@master
      env:
        ado_token: '${{ secrets.ADO_PERSONAL_ACCESS_TOKEN }}'   
        github_token: '${{ secrets.GH_TOKEN }}'    
        ado_organization: 'privatepreview'
        ado_project: 'Agile'
        ado_wit: 'Pull Request' 
        ado_new_state: 'New'
        ado_active_state: 'Active'
        ado_close_state: 'Closed'
        ado_area_path: 'optional_area_path\\optional_area_path'
```
