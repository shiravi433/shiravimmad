import React from 'react'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Text,
  Flex,
  HelpIcon,
  Button,
  Heading,
  Skeleton,
  useModal,
  Box,
  useTooltip,
} from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useCakeVault } from 'state/hooks'
import useGetVaultBountyInfo from 'hooks/cakeVault/useGetVaultBountyInfo'
import BountyModal from './BountyModal'

const StyledCard = styled(Card)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 240px;
  }
`

const InlineText = styled(Text)`
  display: inline;
`

const BountyCard = () => {
  const { t } = useTranslation()
  const { estimatedCakeBountyReward, estimatedDollarBountyReward, totalPendingCakeHarvest } = useGetVaultBountyInfo()
  const dollarBountyToDisplay =
    estimatedDollarBountyReward && estimatedDollarBountyReward.gte(0)
      ? getFullDisplayBalance(estimatedDollarBountyReward, 18, 2)
      : ''
  const modalCakeBountyToDisplay =
    estimatedCakeBountyReward && estimatedCakeBountyReward.gte(0)
      ? getFullDisplayBalance(estimatedCakeBountyReward, 18, 5)
      : ''
  const cardCakeBountyToDisplay =
    estimatedCakeBountyReward && estimatedCakeBountyReward.gte(0)
      ? getFullDisplayBalance(estimatedCakeBountyReward, 18, 3)
      : ''
  const {
    fees: { callFee },
  } = useCakeVault()

  const TooltipComponent = () => (
    <>
      <Text mb="16px">{`${t(`This bounty is given as a reward for providing a service to other users.`)}`}</Text>
      <Text mb="16px">
        {t(
          'Whenever you successfully claim the bounty, you’re also helping out by activating the Auto CAKE Pool’s compounding function for everyone.',
        )}
      </Text>
      <Text style={{ fontWeight: 'bold' }}>
        {t(`Auto-Compound Bounty: %fee%% of all Auto CAKE pool users’ pending yield`, { fee: callFee / 100 })}
      </Text>
    </>
  )

  const [onPresentBountyModal] = useModal(
    <BountyModal
      cakeBountyToDisplay={modalCakeBountyToDisplay}
      dollarBountyToDisplay={dollarBountyToDisplay}
      totalPendingCakeHarvest={totalPendingCakeHarvest}
      callFee={callFee}
      TooltipComponent={TooltipComponent}
    />,
  )

  const { targetRef, tooltip, tooltipVisible } = useTooltip(<TooltipComponent />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })

  return (
    <>
      {tooltipVisible && tooltip}
      <StyledCard>
        <CardBody>
          <Flex flexDirection="column">
            <Flex alignItems="center" mb="12px">
              <Text fontSize="16px" bold color="textSubtle" mr="4px">
                {t('Auto CAKE Bounty')}
              </Text>
              <Box ref={targetRef}>
                <HelpIcon color="textSubtle" />
              </Box>
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex flexDirection="column" mr="12px">
              <Heading>{cardCakeBountyToDisplay || <Skeleton height={20} width={96} mb="2px" />}</Heading>
              <InlineText fontSize="12px" color="textSubtle">
                {dollarBountyToDisplay ? `~ ${dollarBountyToDisplay} USD` : <Skeleton height={16} width={62} />}
              </InlineText>
            </Flex>
            <Button
              disabled={!dollarBountyToDisplay || !cardCakeBountyToDisplay || !callFee}
              onClick={onPresentBountyModal}
              scale="sm"
            >
              {t('Claim')}
            </Button>
          </Flex>
        </CardBody>
      </StyledCard>
    </>
  )
}

export default BountyCard
