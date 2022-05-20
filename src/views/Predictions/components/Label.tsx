import { Box, CoinSwitcher, Flex, PocketWatchIcon, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef } from 'react'
import { useCountUp } from 'react-countup'
import { useGetCurrentRoundCloseTimestamp } from 'state/predictions/hooks'
import { PredictionSupportedSymbol } from 'state/types'
import styled from 'styled-components'
import { formatBigNumberToFixed } from 'utils/formatBalance'
import { useConfig } from '../context/ConfigProvider'
import { formatRoundTime } from '../helpers'
import useCountdown from '../hooks/useCountdown'
import usePollOraclePrice from '../hooks/usePollOraclePrice'

const Token = styled(Box)`
  margin-top: -24px;
  position: absolute;
  top: 50%;
  z-index: 30;

  & > svg {
    height: 48px;
    width: 48px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: -32px;

    & > svg {
      height: 64px;
      width: 64px;
    }
  }
`

const Title = styled(Text)`
  font-size: 16px;
  line-height: 21px;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 20px;
    line-height: 22px;
  }
`

const ClosingTitle = styled(Text)`
  font-size: 9px;
  line-height: 21px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 20px;
    line-height: 22px;
  }
`

const Price = styled(Text)`
  height: 18px;
  justify-self: start;
  width: 70px;

  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: center;
  }
`

const Interval = styled(Text)`
  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: center;
    width: 32px;
  }
`

const Label = styled(Flex)<{ dir: 'left' | 'right' }>`
  position: relative;
  z-index: 1;
  background-color: ${({ theme }) => theme.card.background};
  box-shadow: ${({ theme }) => theme.shadows.level1};
  align-items: ${({ dir }) => (dir === 'right' ? 'flex-end' : 'flex-start')};
  border-radius: ${({ dir }) => (dir === 'right' ? '8px 8px 8px 24px' : '8px 8px 24px 8px')};
  flex-direction: column;
  overflow: initial;
  padding: ${({ dir }) => (dir === 'right' ? '0 28px 0 8px' : '0 8px 0 24px')};

  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: center;
    border-radius: ${({ theme }) => theme.radii.card};
    flex-direction: row;
    padding: ${({ dir }) => (dir === 'right' ? '8px 40px 8px 8px' : '8px 8px 8px 40px')};
  }
`

export const PricePairLabel: React.FC = () => {
  const { price } = usePollOraclePrice()
  const { token } = useConfig()
  const router = useRouter()

  const priceAsNumber = parseFloat(formatBigNumberToFixed(price, 3, 8))
  const countUpState = useCountUp({
    start: 0,
    end: priceAsNumber,
    duration: 1,
    decimals: 3,
  })

  // const logo = useMemo(() => {
  //   return TOKEN_LOGOS[token.symbol]
  // }, [token.symbol])

  const { countUp, update } = countUpState || {}

  const updateRef = useRef(update)

  useEffect(() => {
    updateRef.current(priceAsNumber)
  }, [priceAsNumber, updateRef])

  const onTokenSwitch = useCallback(() => {
    if (router.query.token === PredictionSupportedSymbol.CAKE) {
      router.query.token = PredictionSupportedSymbol.BNB
    } else {
      router.query.token = PredictionSupportedSymbol.CAKE
    }
    router.push(router)
  }, [router])
  return (
    <>
      <Box pl={['20px', '20px', '20px', '40px']} position="relative" display="inline-block">
        {router.query.token && (
          <CoinSwitcher isDefaultBnb={router.query.token !== 'CAKE'} onTokenSwitch={onTokenSwitch} />
        )}
        <Label dir="left">
          <Title bold textTransform="uppercase">
            {`${token.symbol}USD`}
          </Title>
          <Price fontSize="12px">{`$${countUp}`}</Price>
        </Label>
      </Box>
    </>
  )
}

interface TimerLabelProps {
  interval: string
  unit: 'm' | 'h' | 'd'
}

export const TimerLabel: React.FC<TimerLabelProps> = ({ interval, unit }) => {
  const currentRoundCloseTimestamp = useGetCurrentRoundCloseTimestamp()
  const { secondsRemaining } = useCountdown(currentRoundCloseTimestamp)
  const countdown = formatRoundTime(secondsRemaining)
  const { t } = useTranslation()

  if (!currentRoundCloseTimestamp) {
    return null
  }

  return (
    <Box pr="24px" position="relative">
      <Label dir="right">
        {secondsRemaining !== 0 ? (
          <Title bold color="secondary">
            {countdown}
          </Title>
        ) : (
          <ClosingTitle bold color="secondary">
            {t('Closing')}
          </ClosingTitle>
        )}
        <Interval fontSize="12px">{`${interval}${t(unit)}`}</Interval>
      </Label>
      <Token right={0}>
        <PocketWatchIcon />
      </Token>
    </Box>
  )
}
