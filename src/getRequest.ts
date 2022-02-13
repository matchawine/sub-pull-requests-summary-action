import { GraphQLClient, gql } from "graphql-request"
import {
  GetPrWithAssociatedPRsQuery,
  GetPrWithAssociatedPRsQueryVariables,
} from "./generated/graphql-op"
import { GithubActionConfig } from "./types"

const query = gql`
  fragment PR on PullRequest {
    id
    title
  }

  query getPRWithAssociatedPRs($prId: ID!) {
    node(id: $prId) {
      ... on PullRequest {
        ...PR
        commits(last: 250) {
          nodes {
            commit {
              abbreviatedOid
              message
              associatedPullRequests(
                first: 10
                orderBy: { field: UPDATED_AT, direction: DESC }
              ) {
                nodes {
                  id
                  title
                  url
                  baseRefName
                  state
                  number
                  author {
                    login
                  }
                  assignees(first: 100) {
                    nodes {
                      login
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const endpoint = "https://api.github.com/graphql"

export const executeRequest = async (
  {
    prId,
  }: {
    prId: string
  },
  config: GithubActionConfig,
): Promise<GetPrWithAssociatedPRsQuery> => {
  const variables: GetPrWithAssociatedPRsQueryVariables = { prId }
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${config.token}`,
    },
  })
  return await graphQLClient.request(query, variables)
}
