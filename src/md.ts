import _ from "lodash"
import { GithubActionConfig } from "./types"

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g

export const getMD = (prs: any[], config: GithubActionConfig) => {
  const getPRText = _.template(config.pullRequestDescriptionTemplate)
  return prs.map(getPRText).join("\n")
}
