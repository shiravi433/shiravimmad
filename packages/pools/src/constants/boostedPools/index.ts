import { ChainId } from '@pancakeswap/chains'
import { arbBoostedPools } from './arb'
import { BoosterConfig } from '../../utils/boosted/types'

export type BoostedPoolsConfigByChain<TChainId extends ChainId> = {
  [chainId in TChainId]?: BoosterConfig[]
}

export const BOOSTED_POOLS_CONFIG_BY_CHAIN = {
  [ChainId.ARBITRUM_ONE]: arbBoostedPools,
} as BoostedPoolsConfigByChain<ChainId>

export const getBoostedPoolsConfig = (chainId: ChainId) => {
  return BOOSTED_POOLS_CONFIG_BY_CHAIN[chainId]
}
