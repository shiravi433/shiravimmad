import { Box, Button, Flex, Text, IconButton, AddIcon, MinusIcon, ChevronRightIcon } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { CurrencyAmount, Percent, Token } from '@pancakeswap/swap-sdk-core'
import { useMemo } from 'react'

import { differenceInMilliseconds, format } from 'date-fns'
import styled from 'styled-components'

import { LockedFixedTag } from './LockedFixedTag'
import { PoolGroup, StakePositionUserInfo, StakedPosition } from '../type'
import { ClaimModal } from './ClaimModal'
import { UnlockedFixedTag } from './UnlockedFixedTag'
import { FixedRestakingModal } from './RestakeFixedStakingModal'
import { UnstakeBeforeEnededModal } from './UnstakeBeforeEndedModal'
import { useFixedStakeAPR } from '../hooks/useFixedStakeAPR'
import { AmountWithUSDSub } from './AmountWithUSDSub'
import { useCalculateProjectedReturnAmount } from '../hooks/useCalculateProjectedReturnAmount'

const FlexLeft = styled(Flex)`
  width: 100%;
  align-items: center;
  margin-right: 16px;
  border-right: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

function InfoSection({
  apr,
  shouldUnlock,
  unlockTime,
  accrueInterest,
  tokenSymbol,
  projectedReturnAmount,
}: {
  apr: Percent
  shouldUnlock: boolean
  unlockTime: number
  accrueInterest: CurrencyAmount<Token>
  tokenSymbol: string
  projectedReturnAmount: CurrencyAmount<Token>
}) {
  const { t } = useTranslation()

  return (
    <Box>
      <Text color="textSubtle" fontSize="12px">
        APR: {apr.toSignificant(2)}%
      </Text>

      <Text color="textSubtle" fontSize="12px">
        {shouldUnlock ? 'Fixed Staking ended' : `Ends on ${format(unlockTime * 1_000, 'MMM d, yyyy')}`}
      </Text>

      <Text color="textSubtle" fontSize="12px">
        {shouldUnlock ? (
          <>
            {t('Reward')}: {accrueInterest.toSignificant(3)} {tokenSymbol}
          </>
        ) : (
          <>
            {t('Est. Reward')}: {projectedReturnAmount.toSignificant(3)} {tokenSymbol}
          </>
        )}
      </Text>
    </Box>
  )
}

function StakedPositionRowView({
  amountDeposit,
  shouldUnlock,
  lockPeriod,
  apr,
  unlockTime,
  accrueInterest,
  projectedReturnAmount,
  poolEndDay,
  stakedPeriods,
  pool,
  lockAPR,
  boostAPR,
  unlockAPR,
  poolIndex,
  stakePositionUserInfo,
  token,
  withdrawalFee,
  stakedPositions,
}) {
  const { t } = useTranslation()

  return (
    <Flex>
      <FlexLeft>
        <Flex>
          <Box>
            <AmountWithUSDSub amount={amountDeposit} />
          </Box>
        </Flex>
        <ChevronRightIcon width="24px" />
        {shouldUnlock ? (
          <UnlockedFixedTag>{lockPeriod}D</UnlockedFixedTag>
        ) : (
          <LockedFixedTag>{lockPeriod}D</LockedFixedTag>
        )}
      </FlexLeft>
      <Flex justifyContent="space-between" width="100%">
        <InfoSection
          apr={apr}
          shouldUnlock={shouldUnlock}
          unlockTime={unlockTime}
          accrueInterest={accrueInterest}
          tokenSymbol={token.symbol}
          projectedReturnAmount={projectedReturnAmount}
        />
        {shouldUnlock ? (
          <ClaimModal
            poolEndDay={poolEndDay}
            stakedPeriods={stakedPeriods}
            pool={pool}
            lockAPR={lockAPR}
            boostAPR={boostAPR}
            unlockAPR={unlockAPR}
            poolIndex={poolIndex}
            stakePositionUserInfo={stakePositionUserInfo}
            token={token}
            lockPeriod={lockPeriod}
            unlockTime={unlockTime}
          >
            {(openClaimModal) => (
              <Button height="auto" onClick={openClaimModal}>
                {t('Claim')}
              </Button>
            )}
          </ClaimModal>
        ) : (
          <Flex>
            <UnstakeBeforeEnededModal
              pools={pool.pools}
              poolEndDay={poolEndDay}
              token={token}
              lockPeriod={lockPeriod}
              lockAPR={lockAPR}
              boostAPR={boostAPR}
              unlockAPR={unlockAPR}
              stakePositionUserInfo={stakePositionUserInfo}
              withdrawalFee={withdrawalFee}
              poolIndex={poolIndex}
            >
              {(openUnstakeModal) => (
                <IconButton variant="secondary" onClick={openUnstakeModal} mr="6px">
                  <MinusIcon color="primary" width="14px" />
                </IconButton>
              )}
            </UnstakeBeforeEnededModal>
            <FixedRestakingModal
              stakedPositions={stakedPositions}
              amountDeposit={amountDeposit}
              stakedPeriods={stakedPeriods}
              stakingToken={token}
              pools={pool.pools}
              initialLockPeriod={lockPeriod}
            >
              {(openModal) => (
                <IconButton variant="secondary" onClick={openModal}>
                  <AddIcon color="primary" width="14px" />
                </IconButton>
              )}
            </FixedRestakingModal>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export function StakedPositionSection({
  token,
  stakePositionUserInfo,
  unlockTime,
  lockPeriod,
  poolIndex,
  lockDayPercent,
  boostDayPercent,
  unlockDayPercent,
  withdrawalFee,
  pool,
  stakedPeriods,
  stakePosition,
  showRow,
}: {
  unlockTime: number
  boostDayPercent: number
  token: Token
  stakePosition: StakedPosition
  stakePositionUserInfo: StakePositionUserInfo
  lockPeriod: number
  poolIndex: number
  lockDayPercent: number
  unlockDayPercent: number
  withdrawalFee: number
  pool: PoolGroup
  stakedPeriods: number[]
  showRow?: boolean
}) {
  const { t } = useTranslation()

  const { boostAPR, lockAPR, unlockAPR } = useFixedStakeAPR({ lockDayPercent, boostDayPercent, unlockDayPercent })

  const amountDeposit = useMemo(
    () => CurrencyAmount.fromRawAmount(token, stakePositionUserInfo.userDeposit.toString()),
    [stakePositionUserInfo.userDeposit, token],
  )

  const { projectedReturnAmount } = useCalculateProjectedReturnAmount({
    amountDeposit,
    lastDayAction: stakePositionUserInfo.lastDayAction,
    lockPeriod,
    apr: stakePositionUserInfo.boost ? boostAPR : lockAPR,
    poolEndDay: stakePosition.pool.endDay,
    unlockAPR,
  })

  const accrueInterest = useMemo(
    () => CurrencyAmount.fromRawAmount(token, stakePositionUserInfo.accrueInterest.toString()),
    [stakePositionUserInfo.accrueInterest, token],
  )

  const poolEndDay = pool.pools.find((p) => p.poolIndex === poolIndex)?.endDay || 0

  const shouldUnlock = differenceInMilliseconds(unlockTime * 1_000, new Date()) <= 0

  const stakedPositions = useMemo(() => [stakePosition], [stakePosition])

  const apr = stakePosition.userInfo.boost ? boostAPR : lockAPR

  if (showRow) {
    return (
      <StakedPositionRowView
        amountDeposit={amountDeposit}
        shouldUnlock={shouldUnlock}
        lockPeriod={lockPeriod}
        apr={apr}
        unlockTime={unlockTime}
        accrueInterest={accrueInterest}
        projectedReturnAmount={projectedReturnAmount}
        poolEndDay={poolEndDay}
        stakedPeriods={stakedPeriods}
        pool={pool}
        lockAPR={lockAPR}
        boostAPR={boostAPR}
        unlockAPR={unlockAPR}
        poolIndex={poolIndex}
        stakePositionUserInfo={stakePositionUserInfo}
        token={token}
        withdrawalFee={withdrawalFee}
        stakedPositions={stakedPositions}
      />
    )
  }

  return (
    <>
      <Flex mb="8px" justifyContent="space-between" width="100%">
        <Flex>
          <Box>
            <AmountWithUSDSub amount={amountDeposit} />
          </Box>
        </Flex>

        {shouldUnlock ? (
          <UnlockedFixedTag>{lockPeriod}D</UnlockedFixedTag>
        ) : (
          <LockedFixedTag>{lockPeriod}D</LockedFixedTag>
        )}
      </Flex>
      <Flex justifyContent="space-between" width="100%">
        <InfoSection
          apr={apr}
          shouldUnlock={shouldUnlock}
          unlockTime={unlockTime}
          accrueInterest={accrueInterest}
          tokenSymbol={token.symbol}
          projectedReturnAmount={projectedReturnAmount}
        />
        {shouldUnlock ? (
          <ClaimModal
            poolEndDay={poolEndDay}
            stakedPeriods={stakedPeriods}
            pool={pool}
            lockAPR={lockAPR}
            boostAPR={boostAPR}
            unlockAPR={unlockAPR}
            poolIndex={poolIndex}
            stakePositionUserInfo={stakePositionUserInfo}
            token={token}
            lockPeriod={lockPeriod}
            unlockTime={unlockTime}
          >
            {(openClaimModal) => (
              <Button height="auto" onClick={openClaimModal}>
                {t('Claim')}
              </Button>
            )}
          </ClaimModal>
        ) : (
          <Flex>
            <UnstakeBeforeEnededModal
              pools={pool.pools}
              poolEndDay={poolEndDay}
              token={token}
              lockPeriod={lockPeriod}
              unlockAPR={unlockAPR}
              lockAPR={lockAPR}
              boostAPR={boostAPR}
              stakePositionUserInfo={stakePositionUserInfo}
              withdrawalFee={withdrawalFee}
              poolIndex={poolIndex}
            >
              {(openUnstakeModal) => (
                <IconButton variant="secondary" onClick={openUnstakeModal} mr="6px">
                  <MinusIcon color="primary" width="14px" />
                </IconButton>
              )}
            </UnstakeBeforeEnededModal>
            <FixedRestakingModal
              stakedPositions={stakedPositions}
              amountDeposit={amountDeposit}
              stakedPeriods={stakedPeriods}
              stakingToken={token}
              pools={pool.pools}
              initialLockPeriod={lockPeriod}
            >
              {(openModal) => (
                <IconButton variant="secondary" onClick={openModal}>
                  <AddIcon color="primary" width="14px" />
                </IconButton>
              )}
            </FixedRestakingModal>
          </Flex>
        )}
      </Flex>
    </>
  )
}
