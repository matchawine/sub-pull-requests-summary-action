import * as core from "@actions/core"
import { executeRequest } from "./getRequest"
import { transform } from "./transform"
import { getMD } from "./md"
import { updatePR } from "./updatePR"
import * as github from "@actions/github"

async function run(): Promise<void> {
  try {
    const token: string = core.getInput("GITHUB_TOKEN")
    const prId: string = github.context.payload.pull_request?.node_id

    if (!prId)
      throw new Error(
        "No pull request id found. Are you in a pull request workflow?",
      )

    const res = await executeRequest({ token, prId })
    const v = transform(res)
    const md = getMD(v)
    console.log("Udpate PR", md)
    updatePR({ token, prId, body: md })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
