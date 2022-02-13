import _ from "lodash"
import { GithubActionConfig } from "./types"

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g

const getMD = (
  prs: any[],
  pullRequestMarkdownTemplate: string,
  markdownTemplate: string,
) => {
  const getPRText = _.template(pullRequestMarkdownTemplate)
  const childrenPullRequestMarkdowns = prs.map(getPRText)
  return _.template(markdownTemplate)({ childrenPullRequestMarkdowns })
}

export const getGithubMD = (prs: any[], config: GithubActionConfig) =>
  getMD(
    prs,
    config.childPullRequestGithubMarkdownTemplate,
    config.githubMarkdownTemplate,
  )

export const getOutputMD = (prs: any[], config: GithubActionConfig) =>
  getMD(
    prs,
    config.childPullRequestOutputMarkdownTemplate,
    config.outputMarkdownTemplate,
  )
