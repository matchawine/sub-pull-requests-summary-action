export type GithubActionConfig = {
  baseRefNameFilter: string | null
  token: string
  childPullRequestGithubMarkdownTemplate: string
  githubMarkdownTemplate: string
  childPullRequestOutputMarkdownTemplate: string
  outputMarkdownTemplate: string
}
