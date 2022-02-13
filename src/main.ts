import * as core from "@actions/core"
import { executeRequest } from "./getRequest"
import { transform } from "./transform"
import { getMD } from "./md"
import { updatePR } from "./updatePR"
import * as github from "@actions/github"
import { GithubActionConfig } from "./types"
import { config } from "dotenv"

const getConfig = (): GithubActionConfig => {
  const token: string = core.getInput("GITHUB_TOKEN")
  const pullRequestDescriptionTemplate: string = core.getInput(
    "pull-request-description-template",
  )
  const baseRefNameFilter: string | null =
    core.getInput("base-ref-name-filter") || null

  return {
    token,
    baseRefNameFilter,
    pullRequestDescriptionTemplate,
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
    const md = getMD(v, config)
    console.log("Udpate PR", md)
    updatePR({ prId, body: md }, config)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
