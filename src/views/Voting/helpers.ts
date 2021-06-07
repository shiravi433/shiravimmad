import { request, gql } from 'graphql-request'
import { SNAPSHOT_API, SNAPSHOT_HUB_API, SNAPSHOT_VOTING_API } from 'config/constants/endpoints'
import { Proposal, ProposalState, ProposalType, Vote } from './types'
import { ADMIN_ADDRESS } from './config'

export const isCoreProposal = (proposal: Proposal) => {
  return proposal.author.toLowerCase() === ADMIN_ADDRESS.toLowerCase()
}

export const filterProposalsByType = (proposals: Proposal[], proposalType: ProposalType) => {
  switch (proposalType) {
    case ProposalType.COMMUNITY:
      return proposals.filter((proposal) => !isCoreProposal(proposal))
    case ProposalType.CORE:
      return proposals.filter((proposal) => isCoreProposal(proposal))
    case ProposalType.ALL:
    default:
      return proposals
  }
}

export const getProposals = async (first = 5, skip = 0, state = ProposalState.ACTIVE): Promise<Proposal[]> => {
  try {
    const response: { proposals: Proposal[] } = await request(
      SNAPSHOT_API,
      gql`
        query getProposals($first: Int!, $skip: Int!, $state: String!) {
          proposals(first: $first, skip: $skip, where: { space_in: "pancake", state: $state }) {
            id
            title
            body
            choices
            start
            end
            snapshot
            state
            author
            space {
              id
              name
            }
          }
        }
      `,
      { first, skip, state },
    )
    return response.proposals
  } catch (error) {
    throw new Error(error)
  }
}

export const getProposal = async (id: string): Promise<Proposal> => {
  try {
    const response: { proposal: Proposal } = await request(
      SNAPSHOT_API,
      gql`
        query getProposal($id: String) {
          proposal(id: $id) {
            id
            title
            body
            choices
            start
            end
            snapshot
            state
            author
            space {
              id
              name
            }
          }
        }
      `,
      { id },
    )
    return response.proposal
  } catch (error) {
    throw new Error(error)
  }
}

export interface Message {
  address: string
  msg: string
  sig: string
}

export const createProposal = async (message: Message) => {
  try {
    const response = await fetch(SNAPSHOT_HUB_API, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export const saveVotingPower = async (account: string, proposal: string, power: number) => {
  try {
    const response = await fetch(SNAPSHOT_VOTING_API, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account, proposal, power }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}

/* eslint-disable camelcase */
/**
 * @see https://hub.snapshot.page/graphql
 */
export interface VoteWhere {
  id?: string
  id_in?: string[]
  voter?: string
  voter_in?: string[]
  proposal?: string
  proposal_in?: string[]
}

export const getVotes = async (first: number, skip: number, where: VoteWhere): Promise<Vote[]> => {
  try {
    const response: { votes: Vote[] } = await request(
      SNAPSHOT_API,
      gql`
        query getVotes($first: Int, $skip: Int, $where: VoteWhere) {
          votes(first: $first, skip: $skip, where: $where) {
            id
            voter
            created
            choice
            space {
              id
              name
            }
          }
        }
      `,
      { first, skip, where },
    )
    return response.votes
  } catch (error) {
    throw new Error(error)
  }
}

interface VoteItem {
  _id: string
  address: string
  power: number
}

interface VotingResponse {
  code: number
  message: string
  data: VoteItem[]
}

export const getVoteCache = async (proposalId: string): Promise<{ [key: string]: number }> => {
  try {
    const response = await fetch(`${SNAPSHOT_VOTING_API}/${proposalId}`)
    const data: VotingResponse = await response.json()

    return data.data.reduce((accum, vote) => {
      return { ...accum, [vote.address]: vote.power }
    }, {})
  } catch (error) {
    throw new Error(error)
  }
}
