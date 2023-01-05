import { JSBI } from '@pancakeswap/swap-sdk-core'

import { subIn256 } from '.'
import { Q128 } from '../constants'

export abstract class PositionLibrary {
  /**
   * Cannot be constructed.
   */
  private constructor() {}

  // replicates the portions of Position#update required to compute unaccounted fees
  public static getTokensOwed(
    feeGrowthInside0LastX128: JSBI,
    feeGrowthInside1LastX128: JSBI,
    liquidity: JSBI,
    feeGrowthInside0X128: JSBI,
    feeGrowthInside1X128: JSBI
  ) {
    const tokensOwed0 = JSBI.divide(
      JSBI.multiply(subIn256(feeGrowthInside0X128, feeGrowthInside0LastX128), liquidity),
      Q128
    )

    const tokensOwed1 = JSBI.divide(
      JSBI.multiply(subIn256(feeGrowthInside1X128, feeGrowthInside1LastX128), liquidity),
      Q128
    )

    return [tokensOwed0, tokensOwed1]
  }
}
