import { ChainId } from '@pancakeswap/chains'
import { useEffect } from 'react'
import { getChainlinkOracleContract } from 'utils/contractHelpers'
import { Address } from 'viem'
import { useBlockNumber, useReadContract } from 'wagmi'
import { useQueryClient } from '@tanstack/react-query'

const getOracleAddress = (chainId: number): Address | null => {
  switch (chainId) {
    case ChainId.ETHEREUM:
    case ChainId.GOERLI:
      return '0x63D407F32Aa72E63C7209ce1c2F5dA40b3AaE726' // ETH/BNB pair
    default:
      return null
  }
}

export const useOraclePrice = (chainId?: number) => {
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const queryClient = useQueryClient()

  const tokenAddress = chainId ? getOracleAddress(chainId) : undefined
  const chainlinkOracleContract = tokenAddress ? getChainlinkOracleContract(tokenAddress, undefined, ChainId.BSC) : null
  const { data: price, queryKey } = useReadContract({
    abi: chainlinkOracleContract?.abi,
    chainId: ChainId.BSC,
    address: tokenAddress ?? undefined,
    functionName: 'latestAnswer',
  })

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey }, { cancelRefetch: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber, queryClient])

  return price?.toString() ?? '0'
}
