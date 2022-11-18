import { Currency, CurrencyAmount, TradeType, Trade, Price, ChainId, Percent } from '@pancakeswap/sdk'
import { TradeWithStableSwap, RouteType, Trade as SmartRouterTrade, Pair } from '@pancakeswap/smart-router/evm'
import { useMemo } from 'react'

import { Field } from 'state/swap/actions'
import {
  computeSlippageAdjustedAmounts as computeSlippageAdjustedAmountsForV2Trade,
  computeTradePriceBreakdown as computeTradePriceBreakdownForV2Trade,
} from 'utils/exchange'
import { ROUTER_ADDRESS } from 'config/constants/exchange'

import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from '../utils/exchange'

interface Options {
  trade?: TradeWithStableSwap<Currency, Currency, TradeType> | null
  v2Trade?: Trade<Currency, Currency, TradeType> | null
  useSmartRouter?: boolean
  allowedSlippage: number
  chainId: ChainId
}

interface Info {
  tradeType: TradeType
  inputAmount: CurrencyAmount<Currency>
  outputAmount: CurrencyAmount<Currency>
  route: {
    pairs: Pair[]
    path: Currency[]
  }
  slippageAdjustedAmounts: { [field in Field]?: CurrencyAmount<Currency> }
  executionPrice: Price<Currency, Currency>
  routerAddress: string
  priceImpactWithoutFee?: Percent
  realizedLPFee?: CurrencyAmount<Currency> | null
  fallbackV2: boolean
}

export function useTradeInfo({
  trade,
  v2Trade,
  useSmartRouter = true,
  allowedSlippage = 0,
  chainId,
}: Options): Info | null {
  return useMemo(() => {
    const smartRouterAvailable = useSmartRouter && !!trade
    const fallbackV2 = !smartRouterAvailable || trade?.route.routeType === RouteType.V2
    if (!trade || (fallbackV2 && !v2Trade)) {
      return null
    }

    if (fallbackV2) {
      const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdownForV2Trade(v2Trade)
      return {
        tradeType: v2Trade.tradeType,
        fallbackV2,
        route: v2Trade.route,
        inputAmount: v2Trade.inputAmount,
        outputAmount: v2Trade.outputAmount,
        slippageAdjustedAmounts: computeSlippageAdjustedAmountsForV2Trade(v2Trade, allowedSlippage),
        executionPrice: v2Trade.executionPrice,
        routerAddress: ROUTER_ADDRESS[chainId],
        priceImpactWithoutFee,
        realizedLPFee,
      }
    }

    const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
    return {
      tradeType: trade.tradeType,
      fallbackV2,
      route: trade.route,
      inputAmount: trade.inputAmount,
      outputAmount: trade.outputAmount,
      slippageAdjustedAmounts: computeSlippageAdjustedAmounts(trade, allowedSlippage),
      executionPrice: SmartRouterTrade.executionPrice(trade),
      // TODO should use the new router address
      routerAddress: ROUTER_ADDRESS[chainId],
      priceImpactWithoutFee,
      realizedLPFee,
    }
  }, [useSmartRouter, trade, v2Trade, allowedSlippage, chainId])
}
