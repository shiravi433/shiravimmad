// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import { Farm } from 'types/farms'
import Grid from 'components/layout/Grid'
import { useFarmsLP, usePriceBnbBusd } from 'contexts/DataContext'
import { QuoteToken } from 'sushi/lib/constants/types'
import useI18n from 'hooks/useI18n'
import Page from 'components/Page'
import FarmCard from './components/FarmCard'

interface FarmsProps {
  removed: boolean
}

interface FarmWithStakedValue extends Farm {
  apy: BigNumber
}

const Farms: React.FC<FarmsProps> = ({ removed }) => {
  const TranslateString = useI18n()

  const farmsLP = useFarmsLP()
  const bnbPrice = usePriceBnbBusd()

  const cakePriceVsBNB = farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || new BigNumber(0)

  const realFarms = removed
    ? farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X')
    : farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')

  const rows = realFarms.reduce<FarmWithStakedValue[][]>((accum, farm) => {
    const cakeRewardPerBlock = farm && CAKE_PER_BLOCK.times(farm.poolWeight)
    const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

    let apy =
      farm.lpTotalInQuoteToken && !removed
        ? cakePriceVsBNB.times(cakeRewardPerYear).div(farm.lpTotalInQuoteToken)
        : null

    if (farm.quoteTokenSymbol === QuoteToken.BUSD) {
      apy = farm.tokenAmount ? cakePriceVsBNB.times(cakeRewardPerYear).div(farm.tokenAmount).times(bnbPrice) : null
    } else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
      apy = farm.tokenAmount ? cakeRewardPerYear.div(farm.lpTotalInQuoteToken) : null
    } else if (farm.dual) {
      const cakeApy =
        farm && cakePriceVsBNB.times(cakeRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
      const dualApy =
        farm.tokenPriceVsQuote &&
        farm.tokenPriceVsQuote.times(farm.dual.rewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)

      apy = cakeApy && dualApy && cakeApy.plus(dualApy)
    }

    return [
      ...accum,
      {
        ...farm,
        apy,
      },
    ]
  }, [])

  return (
    <Page>
      <Title>{TranslateString(320, 'Stake FLIP tokens to stack CAKE')}</Title>
      <StyledLink exact activeClassName="active" to="/staking">
        Staking
      </StyledLink>
      <Page>
        <Grid>
          {rows.map((farm) => (
            <FarmCard key={farm.pid} farm={farm} removed={removed} />
          ))}
        </Grid>
      </Page>
      {removed ? (
        <NavLink exact activeClassName="active" to="/farms">
          Active Pools
        </NavLink>
      ) : (
        <NavLink exact activeClassName="active" to="/removed">
          Inactive Pools
        </NavLink>
      )}
      <Image src="/images/cakecat.png" />
    </Page>
  )
}

const StyledLink = styled(NavLink)`
  display: none;
  @media (max-width: 400px) {
    display: block;
    background: #50d7dd;
    border-radius: 5px;
    line-height: 40px;
    font-weight: 900;
    padding: 0 20px;
    margin-bottom: 30px;
    color: #fff;
  }
`

const Image = styled.img`
  @media (max-width: 500px) {
    width: 100vw;
  }
`

const Title = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 29px;
  width: 50vw;
  text-align: center;
  font-weight: 900;
  margin: 50px;
`

export default Farms
