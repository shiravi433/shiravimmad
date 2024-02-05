import { getPermit2Address } from '@pancakeswap/permit2-sdk'
import { Currency, CurrencyAmount, Token } from '@pancakeswap/swap-sdk-core'
import { Permit2Signature } from '@pancakeswap/universal-router-sdk'
import { QueryObserverResult } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import { Address } from 'viem'
import { SendTransactionResult } from 'wagmi/actions'
import useAccountActiveChain from './useAccountActiveChain'
import { useApproveCallback } from './useApproveCallback'
import { Permit2Details, usePermit2Details } from './usePermit2Details'
import { usePermit2Requires } from './usePermit2Requires'
import { useWritePermit } from './useWritePermit'

type Permit2HookState = {
  permit2Allowance: CurrencyAmount<Currency> | undefined
  permit2Details: Permit2Details
  permit2Signature: Permit2Signature | undefined

  isPermitting: boolean
  isApproving: boolean
  isRevoking: boolean

  requirePermit: boolean
  requireApprove: boolean
  requireRevoke: boolean
}

type Permit2HookCallback = {
  permit: () => Promise<Permit2Signature>
  approve: () => Promise<SendTransactionResult | undefined>
  revoke: () => Promise<SendTransactionResult | undefined>

  refetch: () => Promise<QueryObserverResult<bigint>>
}

type UsePermit2ReturnType = Permit2HookState & Permit2HookCallback

export const usePermit2 = (
  amount: CurrencyAmount<Token> | undefined,
  spender: Address | undefined,
): UsePermit2ReturnType => {
  const { account, chainId } = useAccountActiveChain()
  const approveTarget = useMemo(() => getPermit2Address(chainId), [chainId])

  const permit2Details = usePermit2Details(account, amount?.currency, spender)
  const [permit2Signature, setPermit2Signature] = useState<Permit2Signature | undefined>()
  const {
    requireApprove,
    requirePermit,
    requireRevoke,
    refetch,
    allowance: permit2Allowance,
  } = usePermit2Requires(amount, spender)

  const [isPermitting, setIsPermitting] = useState(false)
  const [isRevoking, setIsRevoking] = useState(false)
  const [isApproving, setIsApproving] = useState(false)

  const writePermit = useWritePermit(amount?.currency, spender, permit2Details.nonce)
  const {
    approveCallback,
    revokeCallback,
    // currentAllowance: permit2Allowance,
  } = useApproveCallback(amount, approveTarget)

  const permit = useCallback(async () => {
    setIsPermitting(true)
    setPermit2Signature(undefined)

    const signature = await writePermit()

    setPermit2Signature(signature)
    setIsPermitting(false)

    return signature
  }, [writePermit])

  const approve = useCallback(async () => {
    setIsApproving(true)
    try {
      const result = await approveCallback()
      setIsApproving(false)
      return result
    } catch (error) {
      setIsApproving(false)
      throw error
    }
  }, [approveCallback])

  const revoke = useCallback(async () => {
    setIsRevoking(true)
    try {
      const result = await revokeCallback()
      setIsRevoking(false)
      return result
    } catch (error) {
      setIsRevoking(false)
      throw error
    }
  }, [revokeCallback])

  return {
    permit2Allowance,
    permit2Details,
    permit2Signature,

    isPermitting,
    isApproving,
    isRevoking,

    requireApprove,
    requirePermit,
    requireRevoke,

    refetch,

    approve,
    revoke,
    permit,
  }
}
