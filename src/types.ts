export type GithubActionConfig = {
  baseRefNameFilter: string | null
  token: string
  childPullRequestGithubMarkdownTemplate: string
  loneCommitGithubMarkdownTemplate: string
  githubMarkdownTemplate: string
  childPullRequestOutputMarkdownTemplate: string
  loneCommitOutputMarkdownTemplate: string
  outputMarkdownTemplate: string
}
