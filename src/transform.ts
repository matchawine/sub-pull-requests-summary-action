import _ from "lodash"
import { GetPrWithAssociatedPRsQuery } from "./generated/graphql-op"
import { GithubActionConfig } from "./types"

type PullRequest = GetPrWithAssociatedPRsQuery["node"]
// type Commit = PullRequest["commits"]

// @ts-ignore
export const transform = (
  githubResponse: GetPrWithAssociatedPRsQuery,
  config: GithubActionConfig,
) => {
  const pullRequest: PullRequest = githubResponse.node

  if (!pullRequest) throw new Error("no pr")

  const baseRefNameFilter = config.baseRefNameFilter
    ? { baseRefName: config.baseRefNameFilter }
    : _.identity

  // @ts-ignore
  const commits = (pullRequest && pullRequest.commits.nodes) || []

  const associatedPullRequests = _(commits)
    .map("commit")
    .map("associatedPullRequests")
    .map("nodes")
    .flatten()
    .filter({ state: "MERGED" })
    .filter(baseRefNameFilter)
    .uniqBy("id")
    .value()
  return associatedPullRequests
}