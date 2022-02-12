import "dotenv/config"
import { executeRequest } from "../src/getRequest"
import { transform } from "../src/transform"
import { getMD } from "../src/md"

const token = process.env.GITHUB_TOKEN
const prId = "PR_kwDOGzILZc4yIyxe"

describe("Ship description", () => {
  test("Response", async () => {
    const res = await executeRequest({ token, prId })
    expect(res).toMatchSnapshot()
  })

  test("Transform", async () => {
    const res = await executeRequest({ token, prId })
    const transformed = transform(res)
    expect(transformed).toMatchSnapshot()
  })

  test("MD", async () => {
    const res = await executeRequest({ token, prId })
    const transformed = transform(res)
    const md = getMD(transformed)
    expect(md).toMatchSnapshot()
  })
})
