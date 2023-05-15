import { ChainId } from '@pancakeswap/sdk'
import { CHAINS } from 'config/chains'
import { PUBLIC_NODES } from 'config/nodes'
import { createPublicClient, http, fallback, PublicClient } from 'viem'

const viemClients = CHAINS.reduce((prev, cur) => {
  const isSingle = !Array.isArray(PUBLIC_NODES[cur.id])
  const transport = isSingle
    ? http(PUBLIC_NODES[cur.id] as string, {
        timeout: 15_000,
      })
    : fallback(
        (PUBLIC_NODES[cur.id] as string[]).map((url) =>
          http(url, {
            timeout: 15_000,
          }),
        ),
        {
          rank: false,
        },
      )
  return {
    ...prev,
    [cur.id]: createPublicClient({
      chain: cur,
      transport,
      batch: {
        multicall: {
          batchSize: 1_024 * 10,
        },
      },
    }),
  }
}, {} as Record<ChainId, PublicClient>)

export const getViemClients = ({ chainId }: { chainId?: ChainId }) => {
  return viemClients[chainId]
}
