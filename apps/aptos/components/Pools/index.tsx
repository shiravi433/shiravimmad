import { useTranslation } from '@pancakeswap/localization'
import { Flex, Heading, PageHeader, ScrollToTopButtonV2, Pool, Text, FlexLayout } from '@pancakeswap/uikit'
import { Coin } from '@pancakeswap/aptos-swap-sdk'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import styled from 'styled-components'

import Page from 'components/Layout/Page'
import Portal from 'components/Portal'
import { TokenPairImage } from 'components/TokenImage'
import { ConnectWalletButton } from 'components/ConnectWalletButton'
import { usePoolsList } from 'state/pools/hooks'

import NoSSR from '../NoSSR'
import PoolControls from './components/PoolControls'
import CardActions from './components/PoolCard/CardActions'

const CardLayout = styled(FlexLayout)`
  justify-content: center;
`

const PoolsPage: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const pools = usePoolsList()
  // const { isSuccess: userDataLoaded } = usePoolsUserData()

  return (
    <>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              {t('Syrup Pools')}
            </Heading>
            <Heading scale="md" color="text">
              {t('Just stake some tokens to earn.')}
            </Heading>
            <Heading scale="md" color="text">
              {t('High APR, low risk.')}
            </Heading>
          </Flex>
        </Flex>
      </PageHeader>
      <Page title={t('Pools')}>
        <NoSSR>
          <PoolControls pools={pools}>
            {({ chosenPools }) => {
              return (
                <CardLayout>
                  {chosenPools.map((pool) => (
                    <Pool.PoolCard<Coin>
                      key={pool.sousId}
                      pool={pool}
                      isStaked={Boolean(pool?.userData?.stakedBalance?.gt(0))}
                      cardContent={
                        account ? (
                          <CardActions pool={pool} stakedBalance={pool?.userData?.stakedBalance} />
                        ) : (
                          <>
                            <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
                              {t('Start earning')}
                            </Text>
                            <ConnectWalletButton />
                          </>
                        )
                      }
                      tokenPairImage={
                        <TokenPairImage
                          primaryToken={pool.earningToken}
                          secondaryToken={pool.stakingToken}
                          width={64}
                          height={64}
                        />
                      }
                      cardFooter="Card Footer"
                      aprRow="Apr"
                    />
                  ))}
                </CardLayout>
              )
            }}
          </PoolControls>
        </NoSSR>
      </Page>
    </>
  )
}

export default PoolsPage
