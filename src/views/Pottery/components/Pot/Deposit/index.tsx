import styled from 'styled-components'
import { useMemo } from 'react'
import { Flex, Box, Text, TooltipText, useTooltip } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { GreyCard } from 'components/Card'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useVaultApy } from 'hooks/useVaultApy'
import { usePotteryData } from 'state/pottery/hook'
import getTimePeriods from 'utils/getTimePeriods'
import { getBalanceNumber } from 'utils/formatBalance'
import Balance from 'components/Balance'
import { remainTimeToNextFriday } from 'views/Pottery/helpers'
import { weeksToSeconds } from 'views/Pools/components/utils/formatSecondsToWeeks'
import YourDeposit from '../YourDeposit'
import WinRate from '../WinRate'
import DepositAction from './DepositAction'

const Container = styled(Flex)`
  flex-direction: column;
  padding: 16px 24px;
  border-bottom: solid 1px ${({ theme }) => theme.colors.cardBorder};
`

const CardAction = styled(Flex)`
  flex-direction: column;
  padding: 26px 24px 36px 24px;
`

const Deposit: React.FC = () => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const { getLockedApy } = useVaultApy()
  const { publicData } = usePotteryData()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(t('Pottery draws on each Friday at 12 PM UTC!'), {
    placement: 'bottom-start',
  })

  const apyDisplay = useMemo(() => {
    const apy = getLockedApy(weeksToSeconds(10))
    return `${Number(apy).toFixed(2)}%`
  }, [getLockedApy])

  const secondsRemaining = remainTimeToNextFriday()
  const { days, hours, minutes } = getTimePeriods(secondsRemaining)

  const totalValueLocked = getBalanceNumber(publicData.totalLockedValue)

  return (
    <Box>
      <Container>
        <GreyCard mb="18px">
          <Flex justifyContent="space-between">
            <YourDeposit />
            <WinRate />
          </Flex>
        </GreyCard>
        <Flex justifyContent="space-between">
          <Text color="textSubtle">{t('APY')}</Text>
          <Text bold>{apyDisplay}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text color="textSubtle">{t('Next draw date')}</Text>
          {tooltipVisible && tooltip}
          <TooltipText ref={targetRef}>
            <Text bold as="span">
              {t('in')}
            </Text>
            {days ? <Text bold as="span" ml="2px">{`${days}${t('d')}`}</Text> : null}
            {hours ? <Text bold as="span" ml="2px">{`${hours}${t('h')}`}</Text> : null}
            {minutes ? <Text bold as="span" ml="2px">{`${minutes}${t('m')}`}</Text> : null}
          </TooltipText>
        </Flex>
        <Flex justifyContent="space-between">
          <Text color="textSubtle">{t('Total Value Locked')}</Text>
          <Balance bold decimals={2} value={totalValueLocked} unit=" CAKE" />
        </Flex>
      </Container>
      <CardAction>{account ? <DepositAction /> : <ConnectWalletButton />}</CardAction>
    </Box>
  )
}

export default Deposit
