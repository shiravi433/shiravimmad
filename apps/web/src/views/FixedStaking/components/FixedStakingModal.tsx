import { useTranslation } from '@pancakeswap/localization'
import {
  Button,
  ModalV2,
  useModalV2,
  Modal,
  Flex,
  Text,
  BalanceInput,
  Slider,
  Box,
  PreTitle,
  useToast,
  Balance,
} from '@pancakeswap/uikit'
import StyledButton from '@pancakeswap/uikit/src/components/Button/StyledButton'
import { getFullDisplayBalance, getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import { getFullDecimalMultiplier } from '@pancakeswap/utils/getFullDecimalMultiplier'
import BigNumber from 'bignumber.js'
import useTokenBalance from 'hooks/useTokenBalance'
import { ReactNode, useCallback, useState } from 'react'
import Divider from 'components/Divider'
import { LightGreyCard } from 'components/Card'
import { useFixedStakingContract } from 'hooks/useContract'
import useCatchTxError from 'hooks/useCatchTxError'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { CurrencyAmount, Token } from '@pancakeswap/sdk'
import { useStablecoinPriceAmount } from 'hooks/useBUSDPrice'
import toNumber from 'lodash/toNumber'
import { CurrencyLogo } from 'components/Logo'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useAccountActiveChain from 'hooks/useAccountActiveChain'

export function FixedStakingModal({
  stakingToken,
  poolIndex,
  lockPeriod,
  children,
}: {
  stakingToken: Token
  poolIndex: number
  lockPeriod: number
  children: (openModal: () => void) => ReactNode
}) {
  const { account } = useAccountActiveChain()

  const { t } = useTranslation()
  const stakeModal = useModalV2()
  const [stakeAmount, setStakeAmount] = useState('')
  const [percent, setPercent] = useState(0)
  const { balance: stakingTokenBalance } = useTokenBalance(stakingToken?.address)
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const fixedStakingContract = useFixedStakingContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess } = useToast()

  const formattedUsdValueStaked = useStablecoinPriceAmount(stakingToken, toNumber(stakeAmount))

  const rawAmount = getDecimalAmount(new BigNumber(stakeAmount), stakingToken.decimals)

  const stakeCurrencyAmount = rawAmount.gt(0)
    ? CurrencyAmount.fromRawAmount(stakingToken, rawAmount.toString())
    : undefined

  const [approval, approveCallback] = useApproveCallback(stakeCurrencyAmount, fixedStakingContract?.address)

  const handleSubmission = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() => {
      const methodArgs = [poolIndex, rawAmount.toString()]
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
  }, [callWithGasPrice, fetchWithCatchTxError, fixedStakingContract, poolIndex, rawAmount, stakeModal, t, toastSuccess])

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

  return account ? (
    <>
      {children(stakeModal.onOpen)}
      <ModalV2 {...stakeModal} closeOnOverlayClick>
        <Modal title={t('Fixed Staking')} width={['100%', '100%', '420px']} maxWidth={['100%', , '420px']}>
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
          <Slider
            min={0}
            max={100}
            value={percent}
            onValueChanged={handleChangePercent}
            name="stake"
            valueLabel={`${percent}%`}
            step={1}
          />
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

          <Box mb="16px" mt="16px">
            <PreTitle textTransform="uppercase" bold mb="8px">
              {t('Position Overview')}
            </PreTitle>
            <LightGreyCard>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize={12} textTransform="uppercase" color="textSubtle" bold>
                  {t('Stake Amount')}
                </Text>
                <Balance bold fontSize="16px" decimals={2} value={toNumber(stakeAmount)} />
              </Flex>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize={12} textTransform="uppercase" color="textSubtle" bold>
                  {t('Duration')}
                </Text>
                <Text bold>
                  {lockPeriod} {t('days')}
                </Text>
              </Flex>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize={12} textTransform="uppercase" color="textSubtle" bold>
                  {t('APR')}
                </Text>
                <Text bold>36%</Text>
              </Flex>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize={12} textTransform="uppercase" color="textSubtle" bold>
                  Unlock On
                </Text>
                <Text bold>Sep 16 2023 21:45</Text>
              </Flex>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize={12} textTransform="uppercase" color="textSubtle" bold>
                  Projected Return
                </Text>
                <Text bold>0.23 BNB</Text>
              </Flex>
            </LightGreyCard>
          </Box>
          {!rawAmount.gt(0) || approval === ApprovalState.APPROVED ? (
            <Button
              disabled={!rawAmount.gt(0) || pendingTx}
              style={{
                minHeight: '48px',
              }}
              onClick={handleSubmission}
            >
              {pendingTx ? t('Confirming') : t('Confirm')}
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
        </Modal>
      </ModalV2>
    </>
  ) : (
    <ConnectWalletButton />
  )
}
