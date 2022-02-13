import { Exact, PullRequestState, Scalars } from "./graphql"

export type PrFragment = { id: string; title: string }

export type PrFragmentVariables = Exact<{ [key: string]: never }>

export type GetPrWithAssociatedPRsQueryVariables = Exact<{
  prId: Scalars["ID"]
}>

export type GetPrWithAssociatedPRsQuery = {
  node?:
    | {
        id: string
        title: string
        commits: {
          nodes?:
            | ({
                commit: {
                  abbreviatedOid: string
                  message: string
                  associatedPullRequests?: {
                    nodes?:
                      | ({
                          id: string
                          title: string
                          baseRefName: string
                          state: PullRequestState
                          number: number
                        } | null)[]
                      | null
                  } | null
                }
              } | null)[]
            | null
        }
      }
    | {}
    | null
}

export type UpdateBodyMutationVariables = Exact<{
  prId: Scalars["ID"]
  body: Scalars["String"]
}>

export type UpdateBodyMutation = {
  updatePullRequest?: {
    pullRequest?: { title: string; body: string } | null
  } | null
}
