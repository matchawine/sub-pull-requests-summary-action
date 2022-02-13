import "dotenv/config"
import { executeRequest } from "../src/getRequest"
import { transform } from "../src/transform"
import { getMD } from "../src/md"
import { GithubActionConfig } from "../src/types"

const token = process.env.GITHUB_TOKEN as string
const defaultPullRequestDescriptionTemplate =
  "- #{{ number }} @{{ author.login }}\n"
const prId = "PR_kwDOGzILZc4yIyxe"

const config: GithubActionConfig = {
  token,
  baseRefNameFilter: null,
  pullRequestDescriptionTemplate: defaultPullRequestDescriptionTemplate,
}

describe("Ship description", () => {
  test.skip("Response", async () => {
    const res = await executeRequest({ prId }, config)
    expect(res).toMatchSnapshot()
  })

  test("Transform", async () => {
    const res = await executeRequest({ prId }, config)
    const transformed = transform(res, config)
    expect(transformed).toMatchSnapshot()
  })

  test("MD", async () => {
    const res = await executeRequest({ prId }, config)
    const transformed = transform(res, config)
    const md = getMD(transformed, config)
    expect(md).toMatchSnapshot()
  })
})
