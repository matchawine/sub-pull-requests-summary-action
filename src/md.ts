import _ from "lodash"
import { GithubActionConfig } from "./types"

type Input = {
  associatedPullRequests: any[]
  loneCommits: any[]
}

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g

type Config = {
  pullRequestMarkdownTemplate: string
  loneCommitMarkdownTemplate: string
  markdownTemplate: string
}

const getMD = (
  { associatedPullRequests, loneCommits }: Input,
  {
    pullRequestMarkdownTemplate,
    loneCommitMarkdownTemplate,
    markdownTemplate,
  }: Config,
) => {
  const getPRText = _.template(pullRequestMarkdownTemplate)
  const getCommitText = _.template(loneCommitMarkdownTemplate)

  const childrenPullRequestMarkdowns = associatedPullRequests.map(getPRText)
  const loneCommitMarkdowns = loneCommits.map(getCommitText)

  return _.template(markdownTemplate)({
    childrenPullRequestMarkdowns,
    loneCommitMarkdowns,
  })
}

export const getGithubMD = (input: Input, config: GithubActionConfig) =>
  getMD(input, {
    pullRequestMarkdownTemplate: config.childPullRequestGithubMarkdownTemplate,
    loneCommitMarkdownTemplate: config.loneCommitGithubMarkdownTemplate,
    markdownTemplate: config.githubMarkdownTemplate,
  })

export const getOutputMD = (input: Input, config: GithubActionConfig) =>
  getMD(input, {
    pullRequestMarkdownTemplate: config.childPullRequestOutputMarkdownTemplate,
    loneCommitMarkdownTemplate: config.loneCommitOutputMarkdownTemplate,
    markdownTemplate: config.outputMarkdownTemplate,
  })
