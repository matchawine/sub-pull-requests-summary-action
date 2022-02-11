import { GraphQLClient, gql } from "graphql-request"

const query = gql`
  query prNode($prId: ID!) {
    node(id: $prId) {
      ... on PullRequest {
        id
        title
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
                  baseRefName
                  state
                  number
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

// @ts-ignore
export const executeRequest = async ({ token, prId }) => {
  const variables = { prId }
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return await graphQLClient.request(query, variables)
}
