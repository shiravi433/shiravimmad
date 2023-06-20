import {
  MinusIcon,
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalV2,
  PreTitle,
  Text,
  useModalV2,
  Message,
  MessageText,
  useToast,
  Balance,
  IconButton,
  AddIcon,
} from '@pancakeswap/uikit'
import { useCallback } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { LightCard } from 'components/Card'
import { Token } from '@pancakeswap/swap-sdk-core'
import { useFixedStakingContract } from 'hooks/useContract'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { getBalanceAmount } from '@pancakeswap/utils/formatBalance'
import { useStablecoinPriceAmount } from 'hooks/useBUSDPrice'
import { format, differenceInMilliseconds } from 'date-fns'
import { distanceToNowStrict } from 'utils/timeHelper'
import { CurrencyLogo } from 'components/Logo'
import { BalanceWithActions } from '@pancakeswap/uikit/src/widgets/Pool'

import { LockedFixedTag } from './LockedFixedTag'
import { StakePositionUserInfo } from '../type'
import { UnlockedFixedTag } from './UnlockedFixedTag'
import { FixedStakingModal } from './FixedStakingModal'

export function FixedStakingPosition({
  token,
  stakePositionUserInfo,
  unlockTime,
  lockPeriod,
  poolIndex,
}: {
  poolIndex: number
  unlockTime: number
  token: Token
  stakePositionUserInfo: StakePositionUserInfo
  lockPeriod: number
}) {
  const { t } = useTranslation()
  const stakeModal = useModalV2()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const fixedStakingContract = useFixedStakingContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess } = useToast()

  const totalStakedAmount = getBalanceAmount(stakePositionUserInfo.userDeposit, token.decimals)

  const formattedUsdValueStaked = useStablecoinPriceAmount(token, totalStakedAmount.toNumber())

  const handleSubmission = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() => {
      const methodArgs = [0]
      return callWithGasPrice(fixedStakingContract, 'withdraw', methodArgs)
    })

    if (receipt?.status) {
      toastSuccess(
        t('Successfully submitted!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Your withdrawn request has been submitted.')}
        </ToastDescriptionWithTx>,
      )
      stakeModal.onDismiss()
    }
  }, [callWithGasPrice, fetchWithCatchTxError, fixedStakingContract, stakeModal, t, toastSuccess])

  const shouldUnlock = differenceInMilliseconds(unlockTime * 1_000, new Date())

  return (
    <>
      <BalanceWithActions
        earningTokenBalance={totalStakedAmount.toNumber()}
        isLoading={pendingTx}
        earningTokenDollarBalance={formattedUsdValueStaked}
        earningTokenPrice={formattedUsdValueStaked}
        earnings={totalStakedAmount}
        actions={
          <Flex>
            <IconButton variant="secondary" onClick={() => stakeModal.setIsOpen(true)} mr="6px">
              <MinusIcon color="primary" width="24px" />
            </IconButton>

            <FixedStakingModal lockPeriod={lockPeriod} poolIndex={poolIndex} stakingToken={token}>
              {(openModal) => (
                <IconButton variant="secondary" onClick={openModal}>
                  <AddIcon color="primary" width="24px" height="24px" />
                </IconButton>
              )}
            </FixedStakingModal>
          </Flex>
        }
      />
      <ModalV2 {...stakeModal} closeOnOverlayClick>
        <Modal
          title={
            <Flex>
              <CurrencyLogo currency={token} size="28px" />
              <Heading color="secondary" scale="lg" mx="8px">
                {token?.symbol}
              </Heading>
              {shouldUnlock ? (
                <UnlockedFixedTag>{t('End')}</UnlockedFixedTag>
              ) : (
                <LockedFixedTag>{lockPeriod}D</LockedFixedTag>
              )}
            </Flex>
          }
          width={['100%', '100%', '420px']}
          maxWidth={['100%', , '420px']}
        >
          <LightCard mb="16px">
            <Flex justifyContent="space-between">
              <Box>
                <PreTitle fontSize="12px" color="textSubtle">
                  {t('Stake Amount')}
                </PreTitle>
                <Flex>
                  <Balance bold fontSize="16px" decimals={2} value={totalStakedAmount.toNumber()} />
                  <Text ml="4px" bold>
                    {token.symbol}
                  </Text>
                </Flex>
                <Balance bold prefix="~$" fontSize="14px" decimals={0} value={formattedUsdValueStaked} />
              </Box>
              <Box>
                <PreTitle fontSize="12px" color="textSubtle">
                  {t('Unlocks In')}
                </PreTitle>
                {shouldUnlock ? (
                  <Text bold color="warning">
                    {t('Unlocked')}
                  </Text>
                ) : (
                  <Text bold fontSize={16}>
                    {distanceToNowStrict(unlockTime * 1_000)}
                  </Text>
                )}
                <Text color={shouldUnlock ? 'warning' : 'textSubtle'} fontSize={12}>
                  On {format(unlockTime * 1_000, 'MMM d, yyyy hh:mm')}
                </Text>
              </Box>
            </Flex>
          </LightCard>
          <PreTitle fontSize="12px" color="textSubtle">
            {t('Position Details')}
          </PreTitle>
          <LightCard mb="16px">
            <Flex alignItems="center" justifyContent="space-between">
              <Text textTransform="uppercase" fontSize={12} color="textSubtle" bold>
                Duration
              </Text>
              <Text bold>{lockPeriod} Days</Text>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between">
              <Text textTransform="uppercase" fontSize={12} color="textSubtle" bold>
                APR
              </Text>
              <Text bold>36%</Text>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between">
              <Text textTransform="uppercase" fontSize={12} color="textSubtle" bold>
                Unlock Date
              </Text>
              <Text bold>{format(unlockTime * 1_000, 'MMM d, yyyy hh:mm')}</Text>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between">
              <Text textTransform="uppercase" fontSize={12} color="textSubtle" bold>
                Projected Return
              </Text>
              <Text bold>2.055 {token.symbol}</Text>
            </Flex>
          </LightCard>
          <PreTitle fontSize="12px" color="textSubtle">
            {t('Withdrawal Details')}
          </PreTitle>
          <LightCard mb="16px">
            <Message variant="warning" mb="16px">
              <MessageText maxWidth="200px">
                {t('No rewards are credited for early withdrawal, and commission is required')}
              </MessageText>
            </Message>
            <Flex alignItems="center" justifyContent="space-between">
              <Text textTransform="uppercase" fontSize={12} color="textSubtle" bold>
                Withdrawal Commission
              </Text>
              <Text bold>1.2507 {token.symbol}</Text>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between">
              <Text textTransform="uppercase" fontSize={12} color="textSubtle" bold>
                You Will Get
              </Text>
              <Text bold>1,1410 {token.symbol}</Text>
            </Flex>
          </LightCard>
          <Button
            disabled={pendingTx}
            style={{
              minHeight: '48px',
            }}
            onClick={handleSubmission}
          >
            {pendingTx ? t('Unstaking...') : t('Unstake')}
          </Button>
        </Modal>
      </ModalV2>
    </>
  )
}
