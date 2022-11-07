import { Currency, CurrencyAmount, Pair, Route, Trade, TradeType } from '@pancakeswap/sdk'

import { RouteWithStableSwap, StableSwapPair, TradeWithStableSwap } from './types'

export function createStableSwapPair(pair: Pair, stableSwapAddress = ''): StableSwapPair {
  const newPair = new Pair(pair.reserve0, pair.reserve1)
  ;(newPair as StableSwapPair).stableSwapAddress = stableSwapAddress
  return newPair as StableSwapPair
}

export function isStableSwapPair(pair: Pair): pair is StableSwapPair {
  return !!(pair as StableSwapPair).stableSwapAddress
}

interface Options<TInput extends Currency, TOutput extends Currency, TTradeType extends TradeType> {
  pairs: (Pair | StableSwapPair)[]
  inputAmount: CurrencyAmount<TInput>
  outputAmount: CurrencyAmount<TOutput>
  tradeType: TTradeType
}

export function createTradeWithStableSwap<
  TInput extends Currency,
  TOutput extends Currency,
  TTradeType extends TradeType,
>({
  pairs,
  inputAmount,
  outputAmount,
  tradeType,
}: Options<TInput, TOutput, TTradeType>): TradeWithStableSwap<TInput, TOutput, TTradeType> {
  const route: RouteWithStableSwap<TInput, TOutput> = new Route(pairs, inputAmount.currency, outputAmount.currency)
  const isExactIn = tradeType === TradeType.EXACT_INPUT
  if (isExactIn) {
    const trade: TradeWithStableSwap<TInput, TOutput, TradeType.EXACT_INPUT> = Trade.exactIn(route, inputAmount)
    trade.outputAmount = outputAmount
    return trade as TradeWithStableSwap<TInput, TOutput, TTradeType>
  }

  const trade: TradeWithStableSwap<TInput, TOutput, TradeType.EXACT_OUTPUT> = Trade.exactOut(route, outputAmount)
  trade.inputAmount = inputAmount
  return trade as TradeWithStableSwap<TInput, TOutput, TTradeType>
}
