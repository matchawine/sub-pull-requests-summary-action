import _ from "lodash"
import { GithubActionConfig } from "./types"

type Input = {
  associatedPullRequests: any[]
  loneCommits: any[]
}

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g

const loneCommitMarkdown = "[{{ abbreviatedOid }}]({{ url }}) {{ message }}"

const getMD = (
  { associatedPullRequests, loneCommits }: Input,
  pullRequestMarkdownTemplate: string,
  markdownTemplate: string,
) => {
  const getPRText = _.template(pullRequestMarkdownTemplate)
  const getCommitText = _.template(loneCommitMarkdown)

  const childrenPullRequestMarkdowns = associatedPullRequests.map(getPRText)
  const loneCommitMarkdowns = loneCommits.map(getCommitText)

  return _.template(markdownTemplate)({
    childrenPullRequestMarkdowns,
    loneCommitMarkdowns,
  })
}

export const getGithubMD = (input: Input, config: GithubActionConfig) =>
  getMD(
    input,
    config.childPullRequestGithubMarkdownTemplate,
    config.githubMarkdownTemplate,
  )

export const getOutputMD = (input: Input, config: GithubActionConfig) =>
  getMD(
    input,
    config.childPullRequestOutputMarkdownTemplate,
    config.outputMarkdownTemplate,
  )
