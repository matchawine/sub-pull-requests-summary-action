import _ from "lodash"
import { GithubActionConfig } from "./types"

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g

export const getMD = (prs: any[], config: GithubActionConfig) => {
  const prsText = prs
    .map(pr => _.template(config.pullRequestDescriptionTemplate)(pr))
    .join("")
  return _.trim(prsText)
}
