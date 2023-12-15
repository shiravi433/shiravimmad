import { ChainId } from '@pancakeswap/chains'

export const GRAPH_API_PREDICTION_BNB = {
  [ChainId.BSC]: 'https://api.thegraph.com/subgraphs/name/pancakeswap/prediction-v2',
}

export const GRAPH_API_PREDICTION_CAKE = {
  [ChainId.BSC]: 'https://api.thegraph.com/subgraphs/name/pancakeswap/prediction-cake',
}

export const GRAPH_API_PREDICTION_ETH = {
  [ChainId.ZKSYNC]: '',
  [ChainId.ARBITRUM_GOERLI]: 'https://api.thegraph.com/subgraphs/name/chef-cannoli/prediction-v2-arbitrum-goerli',
}
