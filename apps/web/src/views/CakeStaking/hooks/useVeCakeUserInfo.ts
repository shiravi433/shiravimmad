import dayjs from 'dayjs'
import useAccountActiveChain from 'hooks/useAccountActiveChain'
import { useVeCakeContract } from 'hooks/useContract'
import { useEffect, useMemo, useState } from 'react'
import { Address } from 'viem'
import { useContractRead } from 'wagmi'
import { CakeLockStatus } from '../types'

export enum CakePoolLockStatus {
  LOCKING = 0,
  WITHDRAW = 1,
}

export type VeCakeUserInfo = {
  // cake amount locked by user
  amount: bigint
  // end time of user lock
  end: bigint
  // lock through cake pool proxy
  // will zeroAddress if not locked through cake pool proxy
  cakePoolProxy: Address
  // cake amount locked by cake pool proxy
  cakeAmount: bigint
  // lock end time of cake pool proxy
  lockEndTime: number
  // migration time of cake pool proxy
  migrationTime: number
  // cake pool type of cake pool proxy
  // 1: Migration
  // 2: Delegation
  cakePoolType: number
  // withdraw flag of cake pool proxy
  // 0: not withdraw
  // 1: already withdraw
  withdrawFlag: CakePoolLockStatus
}

export const useVeCakeUserInfo = (): {
  data?: VeCakeUserInfo
  refetch: () => void
} => {
  const veCakeContract = useVeCakeContract()
  const { account } = useAccountActiveChain()

  const { data, refetch } = useContractRead({
    chainId: veCakeContract?.chain?.id,
    ...veCakeContract,
    functionName: 'getUserInfo',
    enabled: Boolean(veCakeContract?.address && account),
    args: [account!],
    watch: true,
  })

  const userInfo = useMemo(() => {
    if (!data) return undefined

    const [amount, end, cakePoolProxy, cakeAmount, lockEndTime, migrationTime, cakePoolType, withdrawFlag] = data

    return {
      amount,
      end,
      cakePoolProxy,
      cakeAmount,
      lockEndTime,
      migrationTime,
      cakePoolType,
      withdrawFlag,
    } as VeCakeUserInfo
  }, [data])

  return {
    data: userInfo,
    refetch,
  }
}

export const useCakeLockStatus = (): {
  status: CakeLockStatus
  cakeLockedAmount: bigint
  noCakeLocked: boolean
  cakeLockExpired: boolean
  cakePoolLocked: boolean
  cakePoolLockExpired: boolean
  cakeUnlockTime?: number
  cakePoolUnlockTime?: number
} => {
  const { data: userInfo } = useVeCakeUserInfo()
  const [status, setStatus] = useState<CakeLockStatus>(CakeLockStatus.NotLocked)
  const noCakeLocked = useMemo(() => !userInfo || !userInfo.amount, [userInfo])
  const cakeLockExpired = useMemo(() => {
    // @fixme
    return true
    if (noCakeLocked) return false
    return userInfo!.end > dayjs().unix()
  }, [noCakeLocked, userInfo])
  const cakePoolLocked = useMemo(
    () => Boolean(userInfo?.cakeAmount) && userInfo?.withdrawFlag !== CakePoolLockStatus.WITHDRAW,
    [userInfo],
  )
  const cakePoolLockExpired = useMemo(() => {
    if (!cakePoolLocked) return false
    return userInfo!.lockEndTime > dayjs().unix()
  }, [userInfo, cakePoolLocked])

  const cakeLockedAmountDirectly = useMemo(() => {
    if (!userInfo) return BigInt(0)
    return userInfo.amount ?? 0n
  }, [userInfo])
  const cakeLockedAmountCakePool = useMemo(() => {
    if (!cakePoolLocked) return 0n

    return userInfo!.cakeAmount ?? 0n
  }, [userInfo, cakePoolLocked])

  const cakeLockedAmount = useMemo(() => {
    return cakeLockedAmountDirectly + cakeLockedAmountCakePool
  }, [cakeLockedAmountDirectly, cakeLockedAmountCakePool])

  const cakeUnlockTime = useMemo(() => {
    if (!userInfo) return 0
    return dayjs.unix(Number(userInfo.end)).subtract(50, 'days').unix()
  }, [userInfo])

  const cakePoolUnlockTime = useMemo(() => {
    if (!cakePoolLocked) return 0
    return Number(userInfo!.lockEndTime)
  }, [userInfo, cakePoolLocked])

  useEffect(() => {
    if (!userInfo || !userInfo.amount) setStatus(CakeLockStatus.NotLocked)
    if (userInfo?.amount && userInfo.end) setStatus(CakeLockStatus.Locking)
    if (cakeLockExpired) setStatus(CakeLockStatus.Expired)
  }, [userInfo, cakeLockExpired])

  return {
    status,
    cakeLockedAmount,
    noCakeLocked,
    cakeLockExpired,
    cakePoolLocked,
    cakePoolLockExpired,
    cakeUnlockTime,
    cakePoolUnlockTime,
  }
}
