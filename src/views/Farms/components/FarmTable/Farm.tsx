import React from 'react'
import styled from 'styled-components'
import { useFarmUser } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { Text, TokenPairImage } from '@pancakeswap/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { getAddress } from 'utils/addressHelpers'
import { Token } from 'config/constants/types'

export interface FarmProps {
  label: string
  pid: number
  token: Token
  quoteToken: Token
}

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`

const Farm: React.FunctionComponent<FarmProps> = ({ token, quoteToken, label, pid }) => {
  const { stakedBalance } = useFarmUser(pid)
  const { t } = useTranslation()
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const handleRenderFarming = (): JSX.Element => {
    if (rawStakedBalance) {
      return (
        <Text color="secondary" fontSize="12px" bold textTransform="uppercase">
          {t('Farming')}
        </Text>
      )
    }

    return null
  }

  return (
    <Container>
      <TokenPairImage
        variant="inverted"
        primaryTokenAddress={getAddress(token.address)}
        secondaryTokenAddress={getAddress(quoteToken.address)}
        width={40}
        height={40}
        mr="8px"
      />
      <div>
        {handleRenderFarming()}
        <Text bold>{label}</Text>
      </div>
    </Container>
  )
}

export default Farm
