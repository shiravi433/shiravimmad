import { Currency, CurrencyAmount, TradeType, Percent, ONE_HUNDRED_PERCENT, JSBI, Token } from '@pancakeswap/sdk'
import { Trade, SmartRouter } from '@pancakeswap/smart-router/evm'

import { BIPS_BASE, INPUT_FRACTION_AFTER_FEE } from 'config/constants/exchange'
import { Field } from 'state/swap/actions'
import { basisPointsToPercent } from 'utils/exchange'

export type SlippageAdjustedAmounts = {
  [field in Field]?: CurrencyAmount<Currency>
}

// computes the minimum amount out and maximum amount in for a trade given a user specified allowed slippage in bips
export function computeSlippageAdjustedAmounts(
  trade: Trade<TradeType> | undefined | null,
  allowedSlippage: number,
): SlippageAdjustedAmounts {
  const pct = basisPointsToPercent(allowedSlippage)

  return {
    [Field.INPUT]: trade && SmartRouter.maximumAmountIn(trade, pct),
    [Field.OUTPUT]: trade && SmartRouter.minimumAmountOut(trade, pct),
  }
}

// computes price breakdown for the trade
export function computeTradePriceBreakdown(trade?: Trade<TradeType> | null): {
  priceImpactWithoutFee?: Percent | null
  lpFeeAmount?: CurrencyAmount<Currency> | null
} {
  if (!trade) {
    return {
      priceImpactWithoutFee: undefined,
      lpFeeAmount: null,
    }
  }

  const { routes, outputAmount, inputAmount } = trade
  let feePercent = new Percent(0)
  let outputAmountWithoutPriceImpact = CurrencyAmount.fromRawAmount(trade.outputAmount.wrapped.currency, 0)
  for (const route of routes) {
    const { inputAmount: routeInputAmount, pools, percent } = route
    const routeFeePercent = ONE_HUNDRED_PERCENT.subtract(
      pools.reduce<Percent>((currentFee, pool) => {
        if (SmartRouter.isV2Pool(pool)) {
          return currentFee.multiply(INPUT_FRACTION_AFTER_FEE)
        }
        if (SmartRouter.isStablePool(pool)) {
          return currentFee.multiply(ONE_HUNDRED_PERCENT.subtract(pool.fee))
        }
        if (SmartRouter.isV3Pool(pool)) {
          return currentFee.multiply(
            ONE_HUNDRED_PERCENT.subtract(new Percent(pool.fee, JSBI.multiply(BIPS_BASE, JSBI.BigInt(100)))),
          )
        }
        return currentFee
      }, ONE_HUNDRED_PERCENT),
    )
    // Not accurate since for stable swap, the lp fee is deducted on the output side
    feePercent = feePercent.add(routeFeePercent.multiply(new Percent(percent, 100)))

    const midPrice = SmartRouter.getMidPrice(route)
    outputAmountWithoutPriceImpact = outputAmountWithoutPriceImpact.add(
      midPrice.quote(routeInputAmount.wrapped) as CurrencyAmount<Token>,
    )
  }

  const priceImpactRaw = outputAmountWithoutPriceImpact
    .subtract(outputAmount.wrapped)
    .divide(outputAmountWithoutPriceImpact)
  const priceImpactPercent = new Percent(priceImpactRaw.numerator, priceImpactRaw.denominator)
  const priceImpactWithoutFee = priceImpactPercent.subtract(feePercent)
  const lpFeeAmount = inputAmount.multiply(feePercent)

  return {
    priceImpactWithoutFee,
    lpFeeAmount,
  }
}
