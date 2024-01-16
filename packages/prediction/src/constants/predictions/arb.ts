import { ChainId } from '@pancakeswap/chains'
import { arbitrumTokens } from '@pancakeswap/tokens'
import { chainlinkOracleWBTC } from '../../chainlinkOracleContract'
import { GRAPH_API_PREDICTION_WBTC } from '../../endpoints'
import { predictionsWBTC } from '../../predictionContract'
import { PredictionConfig, PredictionSupportedSymbol } from '../../type'

export const predictions: Record<string, PredictionConfig> = {
  // [PredictionSupportedSymbol.ETH]: {
  //   isNativeToken: true,
  //   address: predictionsETH[ChainId.ARBITRUM_ONE],
  //   api: GRAPH_API_PREDICTION_ETH[ChainId.ARBITRUM_ONE],
  //   chainlinkOracleAddress: chainlinkOracleETH[ChainId.ARBITRUM_ONE],
  //   displayedDecimals: 4,
  //   token: Native.onChain(ChainId.ARBITRUM_ONE),
  //   tokenBackgroundColor: '#647ceb',
  // },
  [PredictionSupportedSymbol.WBTC]: {
    isNativeToken: false,
    address: predictionsWBTC[ChainId.ARBITRUM_ONE],
    api: GRAPH_API_PREDICTION_WBTC[ChainId.ARBITRUM_ONE],
    chainlinkOracleAddress: chainlinkOracleWBTC[ChainId.ARBITRUM_ONE],
    displayedDecimals: 4,
    token: arbitrumTokens.wbtc,
    tokenBackgroundColor: '#F7931A',
  },
}
