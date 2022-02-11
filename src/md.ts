import _ from "lodash"

export const getMD = prs => {
  const prsText = prs.map(({ title, number }) => `- #${number}`).join("\n")
  return prsText
}
