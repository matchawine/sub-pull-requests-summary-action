import { GraphQLClient, gql } from "graphql-request"
import { GithubActionConfig } from "./types"

const query = gql`
  mutation updateBody($prId: ID!, $body: String!) {
    updatePullRequest(input: { pullRequestId: $prId, body: $body }) {
      pullRequest {
        title
        body
      }
    }
  }
`

const endpoint = "https://api.github.com/graphql"

// @ts-ignore
export const updatePR = async ({ prId, body }, config: GithubActionConfig) => {
  const variables = { prId, body }
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${config.token}`,
    },
  })
  return await graphQLClient.request(query, variables)
}
