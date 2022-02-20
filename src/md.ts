import _ from "lodash"
import { GithubActionConfig } from "./types"

type Input = {
  associatedPullRequests: any[]
  loneCommits: any[]
}

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g

const getMD = (
  { associatedPullRequests }: Input,
  pullRequestMarkdownTemplate: string,
  markdownTemplate: string,
) => {
  const getPRText = _.template(pullRequestMarkdownTemplate)
  const childrenPullRequestMarkdowns = associatedPullRequests.map(getPRText)
  return _.template(markdownTemplate)({ childrenPullRequestMarkdowns })
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
