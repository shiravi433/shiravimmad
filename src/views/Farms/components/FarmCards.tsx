// @ts-nocheck
import BigNumber from 'bignumber.js'
import React, { useEffect, useState, useCallback } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import { useWallet } from 'use-wallet'
import Button from 'components/Button'
import { Farm } from 'contexts/Farms'
import { useTokenBalance2, useBnbPrice } from 'hooks/useTokenBalance'
import useFarms from 'hooks/useFarms'
import useSushi from 'hooks/useSushi'
import useAllStakedValue, { StakedValue } from 'hooks/useAllStakedValue'
import { getEarned, getMasterChefContract } from 'sushi/utils'
import { bnToDec } from 'utils'
import { TranslateString } from 'utils/translateTextHelpers'
import { forShowPools, BLOCKS_PER_YEAR } from 'sushi/lib/constants'
import useModal from 'hooks/useModal'
import WalletProviderModal from 'components/WalletProviderModal'
import Page from 'components/layout/Page'
import Grid from 'components/layout/Grid'
import CommunityIcon from 'components/icons/CommunityIcon'
import CoreIcon from 'components/icons/CoreIcon'
import Tag from './Tag'
import useI18n from 'hooks/useI18n'

interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber
}

interface FarmCardsProps {
  removed: boolean
}

const SUSHI_PER_BLOCK = new BigNumber(40)
const COMMUNITY_FARMS = []

const FarmCards: React.FC<FarmCardsProps> = ({ removed }) => {
  const [farms] = useFarms()
  const stakedValue = useAllStakedValue()

  const stakedValueById = stakedValue.reduce((accum, value) => {
    return {
      ...accum,
      [value.tokenSymbol]: value,
    }
  }, {})

  const sushiPrice = stakedValueById['CAKE']
    ? stakedValueById['CAKE'].tokenPriceInWeth
    : new BigNumber(0)

  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  const realFarms = !removed
    ? farms.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
    : farms.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X')
  const bnbPrice = useBnbPrice()

  const rows = realFarms.reduce<FarmWithStakedValue[][]>((accum, farm) => {
    const stakedValueItem = stakedValueById[farm.tokenSymbol]

    let apy

    if (farm.pid === 11) {
      apy = stakedValueItem
        ? sushiPrice
            .times(SUSHI_PER_BLOCK)
            .times(BLOCKS_PER_YEAR)
            .times(stakedValueItem.poolWeight)
            .div(stakedValueItem.tokenAmount)
            .div(2)
            .times(bnbPrice)
        : null
    } else {
      apy =
        stakedValueItem && !removed
          ? sushiPrice
              .times(SUSHI_PER_BLOCK)
              .times(BLOCKS_PER_YEAR)
              .times(stakedValueItem.poolWeight)
              .div(stakedValueItem.totalWethValue)
          : null
    }

    return [
      ...accum,
      {
        ...farm,
        ...stakedValueItem,
        apy: apy,
      },
    ]
  }, [])

  return (
    <Page>
      <Grid>
        {rows.length > 0 ? (
          rows.map((farm) => (
            <FarmCard
              farm={farm}
              stakedValue={stakedValueById[farm.tokenSymbol]}
              removed={removed}
            />
          ))
        ) : (
          <StyledLoadingWrapper>
            {forShowPools.map((pool, index) => (
              <FCard key={index}>
                <CardImage>
                  <Multiplier>
                    {pool.multiplier}
                    <Tag>Core</Tag>
                  </Multiplier>
                  <img
                    src={`/images/tokens/category-${pool.tokenSymbol}.png`}
                    alt={pool.tokenSymbol}
                  />
                </CardImage>
                <Label>
                  <span>{TranslateString(316, 'Deposit')}</span>
                  <span className="right">{pool.symbol}</span>
                </Label>
                <Label>
                  <span>{TranslateString(318, 'Earn')}</span>
                  <span className="right">CAKE</span>
                </Label>

                <Button
                  onClick={handleUnlockClick}
                  size="md"
                  text={TranslateString(292, 'Unlock Wallet')}
                />
              </FCard>
            ))}
          </StyledLoadingWrapper>
        )}
      </Grid>
    </Page>
  )
}

const CardImage = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-bottom: 16px;
`

const Label = styled.div`
  line-height: 1.5rem;
  color: ${(props) => props.theme.colors.secondary};
  > span {
    float: left;
  }
  .right {
    float: right;
    color: ${(props) => props.theme.colors.primary};
    font-weight: 900;
  }
`

const FCard = styled.div`
  align-self: stretch;
  background: ${(props) => props.theme.colors.cardBg};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1),
    0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;

  img {
    height: 80px;
    width: 80px;
  }
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, stakedValue, removed }) => {
  const TranslateString = useI18n()
  const totalValue1 =
    useTokenBalance2(
      '0x55d398326f99059ff775485246999027b3197955',
      farm.lpTokenAddress,
    ) * 2
  let totalValue =
    useTokenBalance2(
      '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      farm.lpTokenAddress,
    ) *
    useBnbPrice() *
    2

  if (farm.pid === 11) {
    totalValue = totalValue1
  }

  const [startTime] = useState(1600783200)
  const [, setHarvestable] = useState(0)

  // setStartTime(1600695000)

  const { account } = useWallet()
  const { lpTokenAddress } = farm
  const sushi = useSushi()

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    const paddedDays = days < 10 ? `${days}` : days
    return (
      <span style={{ width: '100%' }}>
        {paddedDays} days {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  useEffect(() => {
    async function fetchEarned() {
      if (sushi) return
      const earned = await getEarned(
        getMasterChefContract(sushi),
        lpTokenAddress,
        account,
      )
      setHarvestable(bnToDec(earned))
    }
    if (sushi && account) {
      fetchEarned()
    }
  }, [sushi, lpTokenAddress, account, setHarvestable])

  const poolActive = true // startTime * 1000 - Date.now() <= 0
  const isCommunityFarm = COMMUNITY_FARMS.includes(farm.pid)
  const TokenIcon = isCommunityFarm ? CommunityIcon : CoreIcon
  const tokenText = isCommunityFarm
    ? TranslateString(999, 'Community')
    : TranslateString(999, 'Core')

  return (
    <FCard>
      {farm.tokenSymbol === 'CAKE' && <StyledCardAccent />}
      <CardImage>
        <div>
          <Multiplier>{farm.multiplier}</Multiplier>
          <Tag>
            <TokenIcon />
            <span style={{ marginLeft: '4px' }}>{tokenText}</span>
          </Tag>
        </div>
        <img
          src={`/images/tokens/category-${farm.tokenSymbol}.png`}
          alt={farm.tokenSymbol}
        />
      </CardImage>
      <Label>
        <span>{TranslateString(316, 'Deposit')}</span>
        <span className="right">
          {farm.lpToken.toUpperCase().replace('PANCAKE', '')}
        </span>
      </Label>
      <Label>
        <span>{TranslateString(318, 'Earn')}</span>
        <span className="right">CAKE</span>
      </Label>
      {!removed && (
        <Label>
          <span>{TranslateString(352, 'APY')}</span>
          <span className="right">
            {farm.apy
              ? `${farm.apy
                  .times(new BigNumber(100))
                  .toNumber()
                  .toLocaleString('en-US')
                  .slice(0, -1)}%`
              : 'Loading ...'}
          </span>
        </Label>
      )}
      <Action>
        <Button
          disabled={!poolActive}
          text={poolActive ? 'Select' : undefined}
          to={`/farms/${farm.id}`}
        >
          {!poolActive && (
            <Countdown date={new Date(startTime * 1000)} renderer={renderer} />
          )}
        </Button>
      </Action>
      {!removed && (
        <Label>
          <span>{TranslateString(23, 'Total Liquidity')}</span>
          <span className="right">
            {farm.lpToken !== 'BAKE-BNB Bakery LP'
              ? `$${parseInt(totalValue).toLocaleString()}`
              : '-'}
          </span>
        </Label>
      )}
      <ViewMore>
        <Link
          href={`https://bscscan.com/address/${farm.lpTokenAddress}`}
          target="_blank"
        >
          {TranslateString(356, 'View on BscScan')} &gt;
        </Link>
      </ViewMore>
    </FCard>
  )
}

const Action = styled.div`
  padding: 16px 0;
`

const ViewMore = styled.div`
  padding-top: 16px;
`

const Link = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.colors.secondary};
`

const RainbowLight = keyframes`

	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 16px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const Multiplier = styled.div`
  line-height: 25px;
  padding: 0 8px;
  background: ${(props) => props.theme.colors.blue[100]};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.bg};
  font-weight: 900;
  margin-bottom: 8px;
`

export default FarmCards
