/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import orderBy from 'lodash/orderBy'
import { getContract } from 'utils/erc20'
import useSushi from 'hooks/useSushi'
import useI18n from 'hooks/useI18n'
import useAllStakedValue from 'hooks/useAllStakedValue'
import { getPools } from 'sushi/utils'
import getSousBlockDataSnapshot from 'utils/getSousBlockDataSnapshot'
import { sousChefTeam } from 'sushi/lib/constants'
import PoolCardv2 from './components/PoolCardv2'
import Coming from './components/Coming'
import Page from 'components/layout/Page'
import Grid from 'components/layout/Grid'

interface SyrupRowProps {
  syrupAddress: string
  sousId: number
  tokenName: string
  projectLink: string
  harvest: boolean
  tokenPerBlock?: string
  cakePrice: BigNumber
  tokenPrice: BigNumber
  community?: boolean
}

const SyrupRow: React.FC<SyrupRowProps> = ({
  sousId,
  tokenName,
  projectLink,
  harvest,
  tokenPerBlock,
  cakePrice,
  tokenPrice,
  community
}) => {
  const { ethereum } = useWallet()
  const syrup = useMemo(() => {
    return getContract(
      ethereum as provider,
      '0x009cF7bC57584b7998236eff51b98A168DceA9B0',
    )
  }, [ethereum])

  return (
    <PoolCardv2
      syrup={syrup}
      cakePrice={cakePrice}
      tokenPrice={tokenPrice}
      tokenPerBlock={tokenPerBlock}
      {...{ sousId, tokenName, projectLink, harvest, community }}
    />
  )
}

const Farm: React.FC = () => {
  const [state, setState] = useState({ isLoading: true, pools: [] })
  const { account, ethereum } = useWallet()
  const sushi = useSushi()
  const TranslateString = useI18n()
  const stakedValue = useAllStakedValue()
  const pools = getPools(sushi) || sousChefTeam
  const transformedPools = useMemo(() => {
    const stakedValueObj = stakedValue.reduce(
      (a, b) => ({
        ...a,
        [b.tokenSymbol]: b,
      }),
      {},
    )

    return pools.map((pool) => ({
      ...pool,
      cakePrice: stakedValueObj['CAKE']?.tokenPriceInWeth || new BigNumber(0),
      tokenPrice:
        stakedValueObj[pool.tokenName]?.tokenPriceInWeth || new BigNumber(0),
    }))
  }, [stakedValue, pools])

  useEffect(() => {
    const addBlockSnapshot = async () => {
      // For each pool get a snaphsot of to determine the state of
      // the pool, then sort
      const poolSnapshots = await Promise.all(
        transformedPools.map(async (pool) => {
          const blockSnapshot = await getSousBlockDataSnapshot(
            ethereum,
            sushi,
            pool.sousId,
          )

          return {
            ...pool,
            blockSnapshot,
          }
        }),
      )

      setState({
        isLoading: false,
        pools: orderBy(poolSnapshots, ['blockSnapshot.isFinished'], ['asc']),
      })
    }

    if (account && ethereum && sushi) {
      addBlockSnapshot()
    } else {
      // For logged out users sort the pools by id. Good chance
      // the newest ones are the most relevant
      setState({
        isLoading: false,
        pools: orderBy(transformedPools, ['sousId'], ['desc']),
      })
    }
  }, [account, ethereum, sushi, stakedValue, transformedPools, setState])

  return (
    <Page>
      <Hero>
        <div>
          <h1>{TranslateString(336, 'SYRUP Pool')}</h1>
          <ul>
            <li>{TranslateString(402, 'Stake SYRUP to earn new tokens.')}</li>
            <li>{TranslateString(404, 'You can unstake at any time.')}</li>
            <li>{TranslateString(406, 'Rewards are calculated per block.')}</li>
          </ul>
        </div>
        <div>
          <img src="/images/syrup.png" alt="SYRUP POOL icon" />
        </div>
      </Hero>
      <Grid>
        {state.isLoading && <div>Loading...</div>}
        {!state.isLoading && (
          <>
            {state.pools.map((pool) => (
              <SyrupRow key={pool.tokenName} {...pool} />
            ))}
            <Coming />
          </>
        )}
      </Grid>
    </Page>
  )
}

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  max-width: 250px;
  padding: 48px 0;

  h1 {
    font-size: 64px;
    color: ${({ theme }) => theme.colors.secondary2};
    line-height: 1.1;
    margin: 0 0 32px 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;

    li {
      margin-bottom: 4px;
    }
  }

  img {
    height: auto;
    max-width: 100%;
  }

  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
  }
`

export default Farm
