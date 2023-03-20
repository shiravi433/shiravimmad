import { Text, Card, Flex, Tag } from '@pancakeswap/uikit'
import NextLink from 'next/link'
import styled from 'styled-components'

import DoubleCurrencyLogo from 'components/Logo/DoubleLogo'
import { Percent, Currency } from '@pancakeswap/sdk'
import { BigNumber } from '@ethersproject/bignumber'

const TagCell = styled(Flex)`
  ${({ theme }) => theme.mediaQueries.sm} {
    position: absolute;
    right: 16px;
    top: 30%;
  }
`

interface LiquidityCardRowProps {
  link: string
  currency0: Currency
  currency1: Currency
  pairText: string | React.ReactElement
  feeAmount?: number
  tokenId?: BigNumber
  tags: React.ReactElement
  subtitle: string
}

export const LiquidityCardRow = ({
  link,
  currency0,
  currency1,
  pairText,
  feeAmount,
  tags,
  subtitle,
  tokenId,
}: LiquidityCardRowProps) => (
  <Card mb="8px">
    <NextLink href={link}>
      <Flex justifyContent="space-between" p="16px">
        <Flex flexDirection="column">
          <Flex alignItems="center" mb="4px" flexWrap="wrap">
            <Flex width={['100%', '100%', 'inherit']} pr="8px">
              <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={20} />
              <Text bold ml="8px">
                {pairText}
              </Text>
            </Flex>
            {tokenId && <Text mr="8px">{`(#${tokenId.toString()})`}</Text>}
            {feeAmount && (
              <Tag variant="secondary" mr="8px" outline>
                {new Percent(feeAmount, 1_000_000).toSignificant()}%
              </Tag>
            )}
            <TagCell>{tags}</TagCell>
          </Flex>
          <Text fontSize="14px" color="textSubtle">
            {subtitle}
          </Text>
        </Flex>
      </Flex>
    </NextLink>
  </Card>
)
