import {WebhookPayload} from '@actions/github/lib/interfaces'

const sampleWebHookPayload: WebhookPayload = {
  action: 'opened',
  number: 14,
  pull_request: {
    url: 'https://api.github.com/repos/danhellem/myapp-web/pulls/14',
    id: 847975880,
    node_id: 'MDExOlB1bGxSZXF1ZXN0NDE0MjA1NTg1',
    html_url: 'https://github.com/danhellem/Lorem-ipsum/pull/14',
    diff_url: 'https://github.com/danhellem/Lorem-ipsum/pull/14.diff',
    patch_url: 'https://github.com/danhellem/Lorem-ipsum/pull/14.patch',
    issue_url: 'https://api.github.com/repos/danhellem/myapp-web/issues/14',
    number: 14,
    state: 'open',
    locked: false,
    title: 'Update README.md',
    user: {
      login: 'danhellem',
      id: 10525048,
      node_id: 'MDQ6VXNlcjEwNTI1MDQ4',
      avatar_url: 'https://avatars2.githubusercontent.com/u/10525048?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/danhellem',
      html_url: 'https://github.com/danhellem',
      followers_url: 'https://api.github.com/users/danhellem/followers',
      following_url:
        'https://api.github.com/users/danhellem/following{/other_user}',
      gists_url: 'https://api.github.com/users/danhellem/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/danhellem/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/danhellem/subscriptions',
      organizations_url: 'https://api.github.com/users/danhellem/orgs',
      repos_url: 'https://api.github.com/users/danhellem/repos',
      events_url: 'https://api.github.com/users/danhellem/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/danhellem/received_events',
      type: 'User',
      site_admin: true
    },
    body: '',
    created_at: '2020-05-06T16:34:25Z',
    updated_at: '2020-05-06T16:34:25Z',
    closed_at: null,
    merged_at: null,
    merge_commit_sha: null,
    assignee: null,
    assignees: [],
    requested_reviewers: [],
    requested_teams: [],
    labels: [],
    milestone: null,
    draft: false,
    commits_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/pulls/6/commits',
    review_comments_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/pulls/6/comments',
    review_comment_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/pulls/comments{/number}',
    comments_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/issues/6/comments',
    statuses_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/statuses/876c291955994de90597746d144103662f1e8878',
    head: {
      label: 'danhellem:danhellem-patch-2',
      ref: 'danhellem-patch-2',
      sha: '876c291955994de90597746d144103662f1e8878',
      user: {
        login: 'danhellem',
        id: 10525048,
        node_id: 'MDQ6VXNlcjEwNTI1MDQ4',
        avatar_url: 'https://avatars2.githubusercontent.com/u/10525048?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/danhellem',
        html_url: 'https://github.com/danhellem',
        followers_url: 'https://api.github.com/users/danhellem/followers',
        following_url:
          'https://api.github.com/users/danhellem/following{/other_user}',
        gists_url: 'https://api.github.com/users/danhellem/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/danhellem/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/danhellem/subscriptions',
        organizations_url: 'https://api.github.com/users/danhellem/orgs',
        repos_url: 'https://api.github.com/users/danhellem/repos',
        events_url: 'https://api.github.com/users/danhellem/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/danhellem/received_events',
        type: 'User',
        site_admin: true
      },
      repo: {
        id: 260292555,
        node_id: 'MDEwOlJlcG9zaXRvcnkyNjAyOTI1NTU=',
        name: 'Lorem-ipsum',
        full_name: 'danhellem/Lorem-ipsum',
        private: false,
        owner: {
          login: 'danhellem',
          id: 10525048,
          node_id: 'MDQ6VXNlcjEwNTI1MDQ4',
          avatar_url: 'https://avatars2.githubusercontent.com/u/10525048?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/danhellem',
          html_url: 'https://github.com/danhellem',
          followers_url: 'https://api.github.com/users/danhellem/followers',
          following_url:
            'https://api.github.com/users/danhellem/following{/other_user}',
          gists_url: 'https://api.github.com/users/danhellem/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/danhellem/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/danhellem/subscriptions',
          organizations_url: 'https://api.github.com/users/danhellem/orgs',
          repos_url: 'https://api.github.com/users/danhellem/repos',
          events_url: 'https://api.github.com/users/danhellem/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/danhellem/received_events',
          type: 'User',
          site_admin: true
        },
        html_url: 'https://github.com/danhellem/Lorem-ipsum',
        description: null,
        fork: false,
        url: 'https://api.github.com/repos/danhellem/Lorem-ipsum',
        forks_url: 'https://api.github.com/repos/danhellem/Lorem-ipsum/forks',
        keys_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/keys{/key_id}',
        collaborators_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/collaborators{/collaborator}',
        teams_url: 'https://api.github.com/repos/danhellem/Lorem-ipsum/teams',
        hooks_url: 'https://api.github.com/repos/danhellem/Lorem-ipsum/hooks',
        issue_events_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/issues/events{/number}',
        events_url: 'https://api.github.com/repos/danhellem/Lorem-ipsum/events',
        assignees_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/assignees{/user}',
        branches_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/branches{/branch}',
        tags_url: 'https://api.github.com/repos/danhellem/Lorem-ipsum/tags',
        blobs_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/git/blobs{/sha}',
        git_tags_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/git/tags{/sha}',
        git_refs_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/git/refs{/sha}',
        trees_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/git/trees{/sha}',
        statuses_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/statuses/{sha}',
        languages_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/languages',
        stargazers_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/stargazers',
        contributors_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/contributors',
        subscribers_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/subscribers',
        subscription_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/subscription',
        commits_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/commits{/sha}',
        git_commits_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/git/commits{/sha}',
        comments_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/comments{/number}',
        issue_comment_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/issues/comments{/number}',
        contents_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/contents/{+path}',
        compare_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/compare/{base}...{head}',
        merges_url: 'https://api.github.com/repos/danhellem/Lorem-ipsum/merges',
        archive_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/{archive_format}{/ref}',
        downloads_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/downloads',
        issues_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/issues{/number}',
        pulls_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/pulls{/number}',
        milestones_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/milestones{/number}',
        notifications_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/notifications{?since,all,participating}',
        labels_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/labels{/name}',
        releases_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/releases{/id}',
        deployments_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/deployments',
        created_at: '2020-04-30T18:50:20Z',
        updated_at: '2020-04-30T18:57:46Z',
        pushed_at: '2020-05-06T16:34:21Z',
        git_url: 'git://github.com/danhellem/Lorem-ipsum.git',
        ssh_url: 'git@github.com:danhellem/Lorem-ipsum.git',
        clone_url: 'https://github.com/danhellem/Lorem-ipsum.git',
        svn_url: 'https://github.com/danhellem/Lorem-ipsum',
        homepage: null,
        size: 3,
        stargazers_count: 0,
        watchers_count: 0,
        language: null,
        has_issues: true,
        has_projects: true,
        has_downloads: true,
        has_wiki: true,
        has_pages: false,
        forks_count: 0,
        mirror_url: null,
        archived: false,
        disabled: false,
        open_issues_count: 2,
        license: {
          key: 'mit',
          name: 'MIT License',
          spdx_id: 'MIT',
          url: 'https://api.github.com/licenses/mit',
          node_id: 'MDc6TGljZW5zZTEz'
        },
        forks: 0,
        open_issues: 2,
        watchers: 0,
        default_branch: 'master'
      }
    },
    base: {
      label: 'danhellem:master',
      ref: 'master',
      sha: '7f23d6c0f4985fa2066bda5554bbcecb4d4383c7',
      user: {
        login: 'danhellem',
        id: 10525048,
        node_id: 'MDQ6VXNlcjEwNTI1MDQ4',
        avatar_url: 'https://avatars2.githubusercontent.com/u/10525048?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/danhellem',
        html_url: 'https://github.com/danhellem',
        followers_url: 'https://api.github.com/users/danhellem/followers',
        following_url:
          'https://api.github.com/users/danhellem/following{/other_user}',
        gists_url: 'https://api.github.com/users/danhellem/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/danhellem/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/danhellem/subscriptions',
        organizations_url: 'https://api.github.com/users/danhellem/orgs',
        repos_url: 'https://api.github.com/users/danhellem/repos',
        events_url: 'https://api.github.com/users/danhellem/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/danhellem/received_events',
        type: 'User',
        site_admin: true
      },
      repo: {
        id: 260292555,
        node_id: 'MDEwOlJlcG9zaXRvcnkyNjAyOTI1NTU=',
        name: 'Lorem-ipsum',
        full_name: 'danhellem/Lorem-ipsum',
        private: false,
        owner: {
          login: 'danhellem',
          id: 10525048,
          node_id: 'MDQ6VXNlcjEwNTI1MDQ4',
          avatar_url: 'https://avatars2.githubusercontent.com/u/10525048?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/danhellem',
          html_url: 'https://github.com/danhellem',
          followers_url: 'https://api.github.com/users/danhellem/followers',
          following_url:
            'https://api.github.com/users/danhellem/following{/other_user}',
          gists_url: 'https://api.github.com/users/danhellem/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/danhellem/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/danhellem/subscriptions',
          organizations_url: 'https://api.github.com/users/danhellem/orgs',
          repos_url: 'https://api.github.com/users/danhellem/repos',
          events_url: 'https://api.github.com/users/danhellem/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/danhellem/received_events',
          type: 'User',
          site_admin: true
        },
        html_url: 'https://github.com/danhellem/Lorem-ipsum',
        description: null,
        fork: false,
        url: 'https://api.github.com/repos/danhellem/Lorem-ipsum',
        forks_url: 'https://api.github.com/repos/danhellem/Lorem-ipsum/forks',
        keys_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/keys{/key_id}',
        collaborators_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/collaborators{/collaborator}',
        teams_url: 'https://api.github.com/repos/danhellem/Lorem-ipsum/teams',
        hooks_url: 'https://api.github.com/repos/danhellem/Lorem-ipsum/hooks',
        issue_events_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/issues/events{/number}',
        events_url: 'https://api.github.com/repos/danhellem/Lorem-ipsum/events',
        assignees_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/assignees{/user}',
        branches_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/branches{/branch}',
        tags_url: 'https://api.github.com/repos/danhellem/Lorem-ipsum/tags',
        blobs_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/git/blobs{/sha}',
        git_tags_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/git/tags{/sha}',
        git_refs_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/git/refs{/sha}',
        trees_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/git/trees{/sha}',
        statuses_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/statuses/{sha}',
        languages_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/languages',
        stargazers_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/stargazers',
        contributors_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/contributors',
        subscribers_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/subscribers',
        subscription_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/subscription',
        commits_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/commits{/sha}',
        git_commits_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/git/commits{/sha}',
        comments_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/comments{/number}',
        issue_comment_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/issues/comments{/number}',
        contents_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/contents/{+path}',
        compare_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/compare/{base}...{head}',
        merges_url: 'https://api.github.com/repos/danhellem/Lorem-ipsum/merges',
        archive_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/{archive_format}{/ref}',
        downloads_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/downloads',
        issues_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/issues{/number}',
        pulls_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/pulls{/number}',
        milestones_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/milestones{/number}',
        notifications_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/notifications{?since,all,participating}',
        labels_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/labels{/name}',
        releases_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/releases{/id}',
        deployments_url:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/deployments',
        created_at: '2020-04-30T18:50:20Z',
        updated_at: '2020-04-30T18:57:46Z',
        pushed_at: '2020-05-06T16:34:21Z',
        git_url: 'git://github.com/danhellem/Lorem-ipsum.git',
        ssh_url: 'git@github.com:danhellem/Lorem-ipsum.git',
        clone_url: 'https://github.com/danhellem/Lorem-ipsum.git',
        svn_url: 'https://github.com/danhellem/Lorem-ipsum',
        homepage: null,
        size: 3,
        stargazers_count: 0,
        watchers_count: 0,
        language: null,
        has_issues: true,
        has_projects: true,
        has_downloads: true,
        has_wiki: true,
        has_pages: false,
        forks_count: 0,
        mirror_url: null,
        archived: false,
        disabled: false,
        open_issues_count: 2,
        license: {
          key: 'mit',
          name: 'MIT License',
          spdx_id: 'MIT',
          url: 'https://api.github.com/licenses/mit',
          node_id: 'MDc6TGljZW5zZTEz'
        },
        forks: 0,
        open_issues: 2,
        watchers: 0,
        default_branch: 'master'
      }
    },
    _links: {
      self: {
        href: 'https://api.github.com/repos/danhellem/Lorem-ipsum/pulls/6'
      },
      html: {
        href: 'https://github.com/danhellem/Lorem-ipsum/pull/6'
      },
      issue: {
        href: 'https://api.github.com/repos/danhellem/Lorem-ipsum/issues/6'
      },
      comments: {
        href:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/issues/6/comments'
      },
      review_comments: {
        href:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/pulls/6/comments'
      },
      review_comment: {
        href:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/pulls/comments{/number}'
      },
      commits: {
        href:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/pulls/6/commits'
      },
      statuses: {
        href:
          'https://api.github.com/repos/danhellem/Lorem-ipsum/statuses/876c291955994de90597746d144103662f1e8878'
      }
    },
    author_association: 'OWNER',
    merged: false,
    mergeable: null,
    rebaseable: null,
    mergeable_state: 'unknown',
    merged_by: null,
    comments: 0,
    review_comments: 0,
    maintainer_can_modify: false,
    commits: 1,
    additions: 1,
    deletions: 1,
    changed_files: 1
  },
  repository: {
    id: 260292555,
    node_id: 'MDEwOlJlcG9zaXRvcnkyNjAyOTI1NTU=',
    name: 'Lorem-ipsum',
    full_name: 'danhellem/Lorem-ipsum',
    private: false,
    owner: {
      login: 'danhellem',
      id: 10525048,
      node_id: 'MDQ6VXNlcjEwNTI1MDQ4',
      avatar_url: 'https://avatars2.githubusercontent.com/u/10525048?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/danhellem',
      html_url: 'https://github.com/danhellem',
      followers_url: 'https://api.github.com/users/danhellem/followers',
      following_url:
        'https://api.github.com/users/danhellem/following{/other_user}',
      gists_url: 'https://api.github.com/users/danhellem/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/danhellem/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/danhellem/subscriptions',
      organizations_url: 'https://api.github.com/users/danhellem/orgs',
      repos_url: 'https://api.github.com/users/danhellem/repos',
      events_url: 'https://api.github.com/users/danhellem/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/danhellem/received_events',
      type: 'User',
      site_admin: true
    },
    html_url: 'https://github.com/danhellem/Lorem-ipsum',
    description: null,
    fork: false,
    url: 'https://api.github.com/repos/danhellem/Lorem-ipsum',
    forks_url: 'https://api.github.com/repos/danhellem/Lorem-ipsum/forks',
    keys_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/keys{/key_id}',
    collaborators_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/collaborators{/collaborator}',
    teams_url: 'https://api.github.com/repos/danhellem/Lorem-ipsum/teams',
    hooks_url: 'https://api.github.com/repos/danhellem/Lorem-ipsum/hooks',
    issue_events_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/issues/events{/number}',
    events_url: 'https://api.github.com/repos/danhellem/Lorem-ipsum/events',
    assignees_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/assignees{/user}',
    branches_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/branches{/branch}',
    tags_url: 'https://api.github.com/repos/danhellem/Lorem-ipsum/tags',
    blobs_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/git/blobs{/sha}',
    git_tags_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/git/tags{/sha}',
    git_refs_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/git/refs{/sha}',
    trees_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/git/trees{/sha}',
    statuses_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/statuses/{sha}',
    languages_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/languages',
    stargazers_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/stargazers',
    contributors_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/contributors',
    subscribers_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/subscribers',
    subscription_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/subscription',
    commits_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/commits{/sha}',
    git_commits_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/git/commits{/sha}',
    comments_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/comments{/number}',
    issue_comment_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/issues/comments{/number}',
    contents_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/contents/{+path}',
    compare_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/compare/{base}...{head}',
    merges_url: 'https://api.github.com/repos/danhellem/Lorem-ipsum/merges',
    archive_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/{archive_format}{/ref}',
    downloads_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/downloads',
    issues_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/issues{/number}',
    pulls_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/pulls{/number}',
    milestones_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/milestones{/number}',
    notifications_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/notifications{?since,all,participating}',
    labels_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/labels{/name}',
    releases_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/releases{/id}',
    deployments_url:
      'https://api.github.com/repos/danhellem/Lorem-ipsum/deployments',
    created_at: '2020-04-30T18:50:20Z',
    updated_at: '2020-04-30T18:57:46Z',
    pushed_at: '2020-05-06T16:34:21Z',
    git_url: 'git://github.com/danhellem/Lorem-ipsum.git',
    ssh_url: 'git@github.com:danhellem/Lorem-ipsum.git',
    clone_url: 'https://github.com/danhellem/Lorem-ipsum.git',
    svn_url: 'https://github.com/danhellem/Lorem-ipsum',
    homepage: null,
    size: 3,
    stargazers_count: 0,
    watchers_count: 0,
    language: null,
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: true,
    has_pages: false,
    forks_count: 0,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 2,
    license: {
      key: 'mit',
      name: 'MIT License',
      spdx_id: 'MIT',
      url: 'https://api.github.com/licenses/mit',
      node_id: 'MDc6TGljZW5zZTEz'
    },
    forks: 0,
    open_issues: 2,
    watchers: 0,
    default_branch: 'master'
  },
  sender: {
    login: 'danhellem',
    id: 10525048,
    node_id: 'MDQ6VXNlcjEwNTI1MDQ4',
    avatar_url: 'https://avatars2.githubusercontent.com/u/10525048?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/danhellem',
    html_url: 'https://github.com/danhellem',
    followers_url: 'https://api.github.com/users/danhellem/followers',
    following_url:
      'https://api.github.com/users/danhellem/following{/other_user}',
    gists_url: 'https://api.github.com/users/danhellem/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/danhellem/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/danhellem/subscriptions',
    organizations_url: 'https://api.github.com/users/danhellem/orgs',
    repos_url: 'https://api.github.com/users/danhellem/repos',
    events_url: 'https://api.github.com/users/danhellem/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/danhellem/received_events',
    type: 'User',
    site_admin: true
  }
}

export default sampleWebHookPayload
