import "dotenv/config"
import { executeRequest } from "../src/getRequest"
import { transform } from "../src/transform"
import { GithubActionConfig } from "../src/types"
import { getGithubMD, getOutputMD } from "../src/md"

const token = process.env.GITHUB_TOKEN as string

const prId = "PR_kwDOGzILZc4zL_V6"

const config: GithubActionConfig = {
  token,
  baseRefNameFilter: null,
  childPullRequestGithubMarkdownTemplate: "- #{{ number }} @{{ author.login }}",
  githubMarkdownTemplate:
    "{{ childrenPullRequestMarkdowns.join(`\n`) }}{{ loneCommitMarkdowns.length > 0 ? `\n\nLone commits:\n${loneCommitMarkdowns.join(`\n`)}` : `` }}",
  childPullRequestOutputMarkdownTemplate:
    "- [#{{ number }} {{ title }}]({{ url }}) @{{ author.login }}",
  outputMarkdownTemplate: "{{ childrenPullRequestMarkdowns.join(`\n`) }}",
}

describe("Ship description", () => {
  test("Response", async () => {
    const res = await executeRequest({ prId }, config)
    expect(res).toMatchSnapshot()
  })

  test("Transform", async () => {
    const res = await executeRequest({ prId }, config)
    const transformed = transform(res, config)
    expect(transformed).toMatchSnapshot()
  })

  test("Github MD", async () => {
    const res = await executeRequest({ prId }, config)
    const transformed = transform(res, config)
    const md = getGithubMD(transformed, config)
    expect(md).toMatchSnapshot()
  })

  test("Output MD", async () => {
    const res = await executeRequest({ prId }, config)
    const transformed = transform(res, config)
    const md = getOutputMD(transformed, config)
    expect(md).toMatchSnapshot()
  })
})
