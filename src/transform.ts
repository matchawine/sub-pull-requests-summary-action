import _ from "lodash"

// @ts-ignore
export const transform = githubResponse => {
  const pullRequest = githubResponse.node
  const commits = pullRequest.commits.nodes
  const associatedPullRequests = _(commits)
    .map("commit")
    .map("associatedPullRequests")
    .map("nodes")
    .flatten()
    .filter({ baseRefName: "develop", state: "MERGED" })
    .uniqBy("id")
    .value()
  return associatedPullRequests
}
