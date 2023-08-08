import { useTranslation } from '@pancakeswap/localization'
import {
  Button,
  useModalV2,
  Modal,
  Flex,
  Text,
  BalanceInput,
  Slider,
  Box,
  PreTitle,
  useToast,
  Heading,
} from '@pancakeswap/uikit'
import StyledButton from '@pancakeswap/uikit/src/components/Button/StyledButton'
import { getFullDisplayBalance, getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import { getFullDecimalMultiplier } from '@pancakeswap/utils/getFullDecimalMultiplier'
import BigNumber from 'bignumber.js'
import useTokenBalance from 'hooks/useTokenBalance'
import { Dispatch, ReactNode, SetStateAction, useCallback, useMemo, useState } from 'react'
import Divider from 'components/Divider'
import { useFixedStakingContract } from 'hooks/useContract'
import useCatchTxError from 'hooks/useCatchTxError'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { CurrencyAmount, Percent, Token } from '@pancakeswap/sdk'
import { useStablecoinPriceAmount } from 'hooks/useBUSDPrice'
import toNumber from 'lodash/toNumber'
import { CurrencyLogo } from 'components/Logo'
import first from 'lodash/first'

import { FixedStakingPool } from '../type'
import { DisclaimerCheckBox } from './DisclaimerCheckBox'
import { useFixedStakeAPR } from '../hooks/useFixedStakeAPR'

interface BodyParam {
  setLockPeriod: Dispatch<SetStateAction<number>>
  stakeCurrencyAmount: CurrencyAmount<Token>
  projectedReturnAmount: CurrencyAmount<Token>
  lockPeriod: number
  isStaked: boolean
  boostAPR: Percent
  lockAPR: Percent
  formattedUsdProjectedReturnAmount: number
}

export function StakingModalTemplate({
  stakingToken,
  pools,
  initialLockPeriod,
  stakedPeriods,
  body,
  head,
  hideStakeButton,
}: {
  stakingToken: Token
  pools: FixedStakingPool[]
  initialLockPeriod: number
  stakedPeriods: number[]
  head?: () => ReactNode
  body: ReactNode | ((params: BodyParam) => ReactNode)
  hideStakeButton?: boolean
}) {
  const { t } = useTranslation()
  const stakeModal = useModalV2()
  const [stakeAmount, setStakeAmount] = useState('')

  const [lockPeriod, setLockPeriod] = useState(
    initialLockPeriod === null || initialLockPeriod === undefined ? first(stakedPeriods) : initialLockPeriod,
  )

  const selectedPool = useMemo(() => pools.find((p) => p.lockPeriod === lockPeriod), [lockPeriod, pools])

  const [percent, setPercent] = useState(0)
  const { balance: stakingTokenBalance } = useTokenBalance(stakingToken?.address)
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const fixedStakingContract = useFixedStakingContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess } = useToast()

  const formattedUsdValueStaked = useStablecoinPriceAmount(stakingToken, toNumber(stakeAmount))

  const rawAmount = getDecimalAmount(new BigNumber(stakeAmount), stakingToken.decimals)

  const stakeCurrencyAmount = CurrencyAmount.fromRawAmount(stakingToken, rawAmount.gt(0) ? rawAmount.toString() : '0')

  const [approval, approveCallback] = useApproveCallback(stakeCurrencyAmount, fixedStakingContract?.address)

  const handleSubmission = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() => {
      const methodArgs = [selectedPool?.poolIndex, rawAmount.toString()]
      return callWithGasPrice(fixedStakingContract, 'deposit', methodArgs)
    })

    if (receipt?.status) {
      toastSuccess(
        t('Staked!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Your funds have been staked in the pool')}
        </ToastDescriptionWithTx>,
      )
      stakeModal.onDismiss()
    }
  }, [
    callWithGasPrice,
    fetchWithCatchTxError,
    fixedStakingContract,
    rawAmount,
    selectedPool?.poolIndex,
    stakeModal,
    t,
    toastSuccess,
  ])

  const handleStakeInputChange = useCallback(
    (input: string) => {
      if (input) {
        const convertedInput = new BigNumber(input).multipliedBy(getFullDecimalMultiplier(stakingToken.decimals))
        const percentage = Math.floor(convertedInput.dividedBy(stakingTokenBalance).multipliedBy(100).toNumber())
        setPercent(percentage > 100 ? 100 : percentage)
      } else {
        setPercent(0)
      }
      setStakeAmount(input)
    },
    [stakingToken.decimals, stakingTokenBalance],
  )

  const handleChangePercent = useCallback(
    (sliderPercent: number) => {
      if (sliderPercent > 0) {
        const percentageOfStakingMax = stakingTokenBalance.dividedBy(100).multipliedBy(sliderPercent)
        const amountToStake = getFullDisplayBalance(
          percentageOfStakingMax,
          stakingToken.decimals,
          stakingToken.decimals,
        )
        setStakeAmount(amountToStake)
      } else {
        setStakeAmount('')
      }
      setPercent(sliderPercent)
    },
    [stakingToken.decimals, stakingTokenBalance],
  )

  const isStaked = !!stakedPeriods.find((p) => p === lockPeriod)

  const aprParams = useMemo(
    () => ({
      boostDayPercent: selectedPool?.boostDayPercent || 0,
      lockDayPercent: selectedPool?.lockDayPercent || 0,
    }),
    [selectedPool?.boostDayPercent, selectedPool?.lockDayPercent],
  )

  const { boostAPR, lockAPR } = useFixedStakeAPR(aprParams)

  const apr = boostAPR.greaterThan(0) ? boostAPR : lockAPR

  const projectedReturnAmount = stakeCurrencyAmount
    ?.multiply(lockPeriod)
    ?.multiply(apr.multiply(lockPeriod).divide(365))

  const formattedUsdProjectedReturnAmount = useStablecoinPriceAmount(
    stakingToken,
    toNumber(projectedReturnAmount?.toSignificant(2)),
  )
  const params = useMemo(
    () => ({
      stakeCurrencyAmount,
      setLockPeriod,
      projectedReturnAmount,
      lockPeriod,
      isStaked,
      boostAPR,
      lockAPR,
      formattedUsdProjectedReturnAmount,
    }),
    [
      boostAPR,
      formattedUsdProjectedReturnAmount,
      isStaked,
      lockAPR,
      lockPeriod,
      projectedReturnAmount,
      stakeCurrencyAmount,
    ],
  )

  return (
    <Modal
      title={
        <Flex>
          <CurrencyLogo currency={stakingToken} size="28px" />
          <Heading color="secondary" scale="lg" mx="8px">
            {t('Stake')} {stakingToken?.symbol}
          </Heading>
        </Flex>
      }
      width={['100%', '100%', '420px']}
      maxWidth={['100%', , '420px']}
    >
      {head ? head() : null}
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <PreTitle textTransform="uppercase" bold>
          {t('Stake Amount')}
        </PreTitle>
        <Flex alignItems="center" minWidth="70px">
          <CurrencyLogo currency={stakingToken} size="24px" />
          <Text ml="4px" bold>
            {stakingToken.symbol}
          </Text>
        </Flex>
      </Flex>
      <BalanceInput
        value={stakeAmount}
        onUserInput={handleStakeInputChange}
        currencyValue={`~${formattedUsdValueStaked || 0} USD`}
        decimals={stakingToken.decimals}
      />
      <Text color="textSubtle" textAlign="right" fontSize="12px" m="8px 0">
        {t('Balance: %balance%', { balance: getFullDisplayBalance(stakingTokenBalance, stakingToken.decimals) })}
      </Text>
      <Box>
        <Slider
          min={0}
          max={100}
          value={percent}
          onValueChanged={handleChangePercent}
          name="stake"
          valueLabel={`${percent}%`}
          step={1}
        />
      </Box>
      <Flex alignItems="center" justifyContent="space-between" mt="8px" mb="16px">
        <StyledButton scale="xs" width="100%" mx="2px" variant="tertiary" onClick={() => handleChangePercent(25)}>
          25%
        </StyledButton>
        <StyledButton scale="xs" width="100%" mx="2px" variant="tertiary" onClick={() => handleChangePercent(50)}>
          50%
        </StyledButton>
        <StyledButton scale="xs" width="100%" mx="2px" variant="tertiary" onClick={() => handleChangePercent(75)}>
          75%
        </StyledButton>
        <StyledButton scale="xs" width="100%" mx="2px" variant="tertiary" onClick={() => handleChangePercent(100)}>
          {t('Max')}
        </StyledButton>
      </Flex>
      <Divider />

      {typeof body === 'function' ? body(params) : body}

      {hideStakeButton ? null : (
        <>
          <DisclaimerCheckBox />

          {!rawAmount.gt(0) || approval === ApprovalState.APPROVED ? (
            <Button
              disabled={!rawAmount.gt(0) || pendingTx}
              style={{
                minHeight: '48px',
              }}
              onClick={handleSubmission}
            >
              {pendingTx ? t('Staking') : t('Stake')}
            </Button>
          ) : (
            <Button
              disabled={!rawAmount.gt(0) || approval === ApprovalState.PENDING || approval === ApprovalState.UNKNOWN}
              style={{
                minHeight: '48px',
              }}
              onClick={approveCallback}
            >
              {approval === ApprovalState.PENDING ? t('Enabling') : t('Enable')}
            </Button>
          )}
        </>
      )}
    </Modal>
  )
}
