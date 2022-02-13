import * as core from "@actions/core"
import { executeRequest } from "./getRequest"
import { transform } from "./transform"
import { getGithubMD, getOutputMD } from "./md"
import { updatePR } from "./updatePR"
import * as github from "@actions/github"
import { GithubActionConfig } from "./types"
import { config } from "dotenv"

const getConfig = (): GithubActionConfig => {
  const token: string = core.getInput("GITHUB_TOKEN")
  const baseRefNameFilter: string | null =
    core.getInput("base-ref-name-filter") || null

  return {
    token,
    baseRefNameFilter,
    childPullRequestGithubMarkdownTemplate: core.getInput(
      "child-pull-request-github-markdown-template",
    ),
    githubMarkdownTemplate: core.getInput("github-markdown-template"),
    childPullRequestOutputMarkdownTemplate: core.getInput(
      "child-pull-request-output-markdown-template",
    ),
    outputMarkdownTemplate: core.getInput("output-markdown-template"),
  }
}

async function run(): Promise<void> {
  try {
    const config: GithubActionConfig = getConfig()

    const prId: string = github.context.payload.pull_request?.node_id

    if (!prId)
      throw new Error(
        "No pull request id found. Are you in a pull request workflow?",
      )

    const res = await executeRequest({ prId }, config)
    const v = transform(res, config)
    const githubMD = getGithubMD(v, config)
    console.log("Udpate PR", githubMD)
    updatePR({ prId, body: githubMD }, config)
    const outputMD = getOutputMD(v, config)

    core.setOutput("markdown", outputMD)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
