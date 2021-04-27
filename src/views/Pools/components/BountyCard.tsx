import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Card, CardBody, Text, Flex, HelpIcon, Button, Heading, Skeleton, useModal } from '@pancakeswap-libs/uikit'
import { useGetApiPrice } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { useCakeVaultContract } from 'hooks/useContract'
import useRefresh from 'hooks/useRefresh'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import BountyModal from './BountyModal'

const StyledCard = styled(Card)`
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 240px;
  }
`

const InlineText = styled(Text)`
  display: inline;
`

const BountyCard = () => {
  const TranslateString = useI18n()
  const cakeVaultContract = useCakeVaultContract()
  const { fastRefresh } = useRefresh()
  const [estimatedBountyReward, setEstimatedBountyReward] = useState(null)
  const [dollarsToDisplay, setDollarsToDisplay] = useState(null)
  const [cakeToDisplay, setCaketoDisplay] = useState(null)
  const [onPresentBountyModal] = useModal(<BountyModal />)

  const stakingTokenPrice = useGetApiPrice(getCakeAddress())

  useEffect(() => {
    const getPricePerShare = async () => {
      const estimatedRewards = await cakeVaultContract.methods.calculateEstimateRewards().call()
      setEstimatedBountyReward(new BigNumber(estimatedRewards))
    }
    getPricePerShare()
  }, [cakeVaultContract, fastRefresh])

  useEffect(() => {
    if (estimatedBountyReward && stakingTokenPrice) {
      // Reduce decimals for production
      const estimatedDollars = getFullDisplayBalance(estimatedBountyReward.multipliedBy(stakingTokenPrice), 18, 4)
      // Reduce decimals for production
      const estimatedCake = getFullDisplayBalance(estimatedBountyReward, 18, 8)
      setDollarsToDisplay(estimatedDollars)
      setCaketoDisplay(estimatedCake)
    }
  }, [stakingTokenPrice, estimatedBountyReward])

  return (
    <StyledCard>
      <CardBody>
        <Flex flexDirection="column">
          <Flex alignItems="center" mb="12px">
            <Text fontSize="16px" bold color="textSubtle" mr="4px">
              {TranslateString(999, 'Auto CAKE Bounty')}
            </Text>
            <HelpIcon color="textSubtle" />
          </Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex flexDirection="column" mr="12px">
            <Heading>{cakeToDisplay || <Skeleton height={20} width={96} mb="2px" />}</Heading>
            <InlineText fontSize="12px" color="textSubtle">
              {dollarsToDisplay ? `~ ${dollarsToDisplay} USD` : <Skeleton height={16} width={62} />}
            </InlineText>
          </Flex>
          <Button onClick={onPresentBountyModal} scale="sm">
            {TranslateString(999, 'Claim')}
          </Button>
        </Flex>
      </CardBody>
    </StyledCard>
  )
}

export default BountyCard
