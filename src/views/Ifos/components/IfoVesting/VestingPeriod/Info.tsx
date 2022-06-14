import { useMemo } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex, Text, Progress, Tag } from '@pancakeswap/uikit'
import { VestingData } from 'views/Ifos/hooks/vesting/fetchUserWalletIfoData'
import { PoolIds } from 'config/constants/types'
import { getBalanceNumber, formatNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import Claim from './Claim'

const WhiteCard = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 12px;
  border-radius: 12px;
  margin: 8px 0 20px 0;
`

const StyleTag = styled(Tag)<{ isPrivate: boolean }>`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme, isPrivate }) => (isPrivate ? theme.colors.gradients.blue : theme.colors.gradients.violet)};
`

interface InfoProps {
  poolId: PoolIds
  data: VestingData
  fetchUserVestingData: () => void
}

const Info: React.FC<InfoProps> = ({ poolId, data, fetchUserVestingData }) => {
  const { t } = useTranslation()
  const { token } = data.ifo
  const { vestingcomputeReleasableAmount, offeringAmountInToken, vestingInfomationPercentage, vestingReleased } =
    data.userVestingData[poolId]

  const labelText = poolId === PoolIds.poolUnlimited ? t('Public Sale') : t('Private Sale')

  const vestingPercentage = useMemo(
    () => new BigNumber(vestingInfomationPercentage).times(0.01),
    [vestingInfomationPercentage],
  )

  const releasedAtSaleEnd = useMemo(() => {
    return new BigNumber(offeringAmountInToken).times(new BigNumber(1).minus(vestingPercentage))
  }, [offeringAmountInToken, vestingPercentage])

  const amountReleased = useMemo(() => {
    return new BigNumber(releasedAtSaleEnd).plus(vestingReleased).plus(vestingcomputeReleasableAmount)
  }, [releasedAtSaleEnd, vestingReleased, vestingcomputeReleasableAmount])

  const received = useMemo(() => {
    const alreadyClaimed = new BigNumber(releasedAtSaleEnd).plus(vestingReleased)
    const balance = getBalanceNumber(alreadyClaimed)
    return balance > 0 ? formatNumber(balance, 4, 4) : '0'
  }, [releasedAtSaleEnd, vestingReleased])

  const claimable = useMemo(() => {
    const balance = getBalanceNumber(vestingcomputeReleasableAmount, token.decimals)
    return balance > 0 ? formatNumber(balance, 4, 4) : '0'
  }, [token, vestingcomputeReleasableAmount])

  const remaining = useMemo(() => {
    const remain = new BigNumber(offeringAmountInToken).minus(amountReleased)
    const balance = getBalanceNumber(remain, token.decimals)
    return balance > 0 ? formatNumber(balance, 4, 4) : '0'
  }, [token, offeringAmountInToken, amountReleased])

  const percentage = useMemo(() => {
    const total = new BigNumber(received).plus(claimable).plus(remaining)
    const receivedPercentage = new BigNumber(received).div(total).times(100).toNumber()
    const amountAvailablePrecentage = new BigNumber(claimable).div(total).times(100).toNumber()
    return {
      receivedPercentage,
      amountAvailablePrecentage: receivedPercentage + amountAvailablePrecentage,
    }
  }, [received, claimable, remaining])

  if (claimable === '0') {
    return null
  }

  return (
    <>
      <Flex justifyContent="space-between">
        <Text style={{ alignSelf: 'center' }} fontSize="12px" bold color="secondary" textTransform="uppercase">
          {t('Vesting Schedule')}
        </Text>
        <StyleTag isPrivate={poolId === PoolIds.poolBasic}>{labelText}</StyleTag>
      </Flex>
      <WhiteCard>
        <Progress primaryStep={percentage.receivedPercentage} secondaryStep={percentage.amountAvailablePrecentage} />
        <Flex>
          <Flex flexDirection="column" mr="8px">
            <Text fontSize="14px">{received}</Text>
            <Text fontSize="14px" color="textSubtle">
              {t('Received')}
            </Text>
          </Flex>
          <Flex flexDirection="column">
            <Text fontSize="14px">{claimable}</Text>
            <Text fontSize="14px" color="textSubtle">
              {t('Claimable')}
            </Text>
          </Flex>
          <Flex flexDirection="column" ml="auto">
            <Text fontSize="14px" textAlign="right">
              {remaining}
            </Text>
            <Text fontSize="14px" color="textSubtle">
              {t('Remaining')}
            </Text>
          </Flex>
        </Flex>
        <Claim poolId={poolId} data={data} fetchUserVestingData={fetchUserVestingData} />
      </WhiteCard>
    </>
  )
}

export default Info
