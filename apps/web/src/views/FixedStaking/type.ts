import { Token } from '@pancakeswap/sdk'
import BigNumber from 'bignumber.js'

export enum FIXED_STAKING_PERIOD {
  D30 = '30D',
  D60 = '60D',
  D90 = '90D',
}

export interface FixedStakingPool {
  poolIndex: number
  token: Token
  endDay: number
  lockDayPercent: number
  boostDayPercent: number
  unlockDayPercent: number
  lockPeriod: number
  withdrawalFee: number
  depositEnabled: boolean
  maxDeposit: number
  minDeposit: number
  totalDeposited: number
  maxPoolAmount: number
  minBoostAmount: number
}

export interface StakePositionUserInfo {
  accrueInterest: BigNumber
  boost: boolean
  endLockTime: boolean
  userDeposit: BigNumber
}

export interface StakedPosition {
  timestampEndLockPeriod: number
  userInfo: StakePositionUserInfo
  pool: FixedStakingPool
}
