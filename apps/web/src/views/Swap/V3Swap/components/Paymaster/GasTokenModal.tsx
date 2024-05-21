import {
  ArrowDropDownIcon,
  ArrowForwardIcon,
  Box,
  Button,
  CircleLoader,
  Column,
  Flex,
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalV2,
  QuestionHelper,
  Text,
  TokenLogo,
  useModalV2,
  useTooltip,
  WarningIcon,
} from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import memoize from 'lodash/memoize'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FixedSizeList } from 'react-window'
import { NumberDisplay } from '@pancakeswap/widgets-internal'
import { useAtom } from 'jotai'
import { useNativeBalances, useTokenBalances } from 'state/wallet/hooks'
import { useAccount } from 'wagmi'
import { formatAmount } from '@pancakeswap/utils/formatFractions'
import { SmartRouterTrade } from '@pancakeswap/smart-router'
import { Address } from 'viem'
import { TradeType } from '@pancakeswap/swap-sdk-core'
import { ChainId } from '@pancakeswap/chains'
import { getUniversalRouterAddress, PancakeSwapUniversalRouter } from '@pancakeswap/universal-router-sdk'
import Image from 'next/image'
import { useUserSlippagePercent } from '@pancakeswap/utils/user'
import { usePaymaster } from './hooks/usePaymaster'
import { DEFAULT_PAYMASTER_TOKEN } from './config/config'
import { PaymasterToken } from './types'
import { feeTokenAtom } from './state/atoms'
import { TradeEssentialForPriceBreakdown } from '../../utils/exchange'
import { RouteDisplayEssentials } from '../RouteDisplayModal'

// Selector Styles

// Old selector style, for use if gas estimate is needed
// const SelectorContainer = styled(Box)`
//   margin: 6px 0;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   background: ${({ theme }) => theme.colors.input};
//   border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
//   border-radius: ${({ theme }) => theme.radii.default};
// `

// const BalanceText = styled.p`
//   font-size: 12px;
//   padding: 10px 14px;
//   color: ${({ theme }) => theme.colors.textSubtle};
// `

const StyledLogo = styled(TokenLogo)<{ size: string }>`
  border-radius: 50%;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`
const GasTokenSelectButton = styled(Button).attrs({ variant: 'text', scale: 'xs' })`
  padding: 18px 0 18px 6px;
`

// Modal Styles
const StyledModalContainer = styled(ModalContainer)`
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 60);
  ${({ theme }) => theme.mediaQueries.md} {
    min-height: auto;
    min-width: 320px;
    max-width: 420px !important;
  }
`

const StyledModalBody = styled(ModalBody)`
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledFooterText = styled(Text)`
  padding: 10px 0 20px 0;
`

const FixedHeightRow = styled.div<{ $disabled: boolean }>`
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;

  cursor: ${({ $disabled }) => !$disabled && 'pointer'};

  &:hover {
    background-color: ${({ theme, $disabled }) => !$disabled && theme.colors.background};
  }

  ${({ $disabled }) =>
    $disabled &&
    `
    opacity: 0.5;
    user-select: none;
`}
`

const StyledBalanceText = styled(Text).attrs({ small: true })`
  white-space: nowrap;
  overflow: hidden;
  max-width: 8rem;
  text-overflow: ellipsis;
`

const Badge = styled.span`
  font-size: 14px;
  padding: 1px 6px;
  border-radius: ${({ theme }) => theme.radii['32px']};
  color: ${({ theme }) => theme.colors.invertedContrast};
  background-color: ${({ theme }) => theme.colors.success};
`
type Trade = TradeEssentialForPriceBreakdown &
  Pick<SmartRouterTrade<TradeType>, 'tradeType'> & {
    routes: RouteDisplayEssentials[]
  }

interface GasTokenModalProps {
  trade?: Trade | null
}

function GasTokenModal({ trade }: GasTokenModalProps) {
  const { t } = useTranslation()
  const { getPaymasterTokenlist } = usePaymaster()
  const { isOpen, setIsOpen, onDismiss } = useModalV2()
  const { address: account } = useAccount()

  // const [slippage] = useUserSlippagePercent()
  // const swapRouterAddress = getUniversalRouterAddress(ChainId.ZKSYNC)

  const [feeToken, setFeeToken] = useAtom(feeTokenAtom)

  const [tokenList, setTokenList] = useState<PaymasterToken[]>([])

  const nativeBalances = useNativeBalances([account])
  const balances = useTokenBalances(account, tokenList.filter((token) => token.isToken) as any[])

  const getTokenBalance = memoize((address: Address) => balances[address])

  const onSelectorButtonClick = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const onTokenSelected = useCallback(
    (token: PaymasterToken) => {
      setFeeToken(token)
      setIsOpen(false)
    },
    [setFeeToken, setIsOpen],
  )

  const fetchTokenList = useCallback(async () => {
    let tempTokenList: PaymasterToken[] = []

    // if (account && trade) {
    //   const rawTxData = PancakeSwapUniversalRouter.swapERC20CallParameters(
    //     { ...trade, gasEstimate: (trade as any).gasUseEstimate } as any,
    //     {
    //       slippageTolerance: slippage,
    //     },
    //   )

    //   tempTokenList = await getPaymasterTokenlist({
    //     data: rawTxData.calldata,
    //     value: rawTxData.value,
    //     from: account,
    //     to: swapRouterAddress,
    //   })
    // } else {
    // In case of fetching when user account is not connected or trade is not defined yet
    tempTokenList = await getPaymasterTokenlist()
    // }

    // Set Native ETH as the first token, followed by the supported ERC20 tokens
    setTokenList([DEFAULT_PAYMASTER_TOKEN, ...tempTokenList.toSorted(tokenListSortComparator)])
  }, [getPaymasterTokenlist])

  /**
   * Sort tokens based on balances
   * Keeps the Native Token in the first position
   */
  const tokenListSortComparator = (tokenA: PaymasterToken, tokenB: PaymasterToken) => {
    const balanceA = getTokenBalance(tokenA.address)
    const balanceB = getTokenBalance(tokenB.address)

    if (!balanceA || !balanceB) return 0

    if (balanceA.greaterThan(balanceB)) return -1
    if (balanceA.lessThan(balanceB)) return 1

    return 0
  }

  useEffect(() => {
    fetchTokenList()
  }, [trade])

  // Item Key for FixedSizeList
  const itemKey = useCallback((index: number, data: any) => `${data[index]}-${index}`, [])

  // const { targetRef, tooltip, tooltipVisible } = useTooltip(
  //   <>{t('Insufficient %symbol% balance for gas fee', { symbol: feeToken.symbol })}</>,
  //   {
  //     placement: 'right',
  //   },
  // )

  // const isInsufficientBalanceForGas = useMemo(() => {
  //   if (!feeToken || !feeToken.estimatedFinalFeeTokenAmount || !feeToken.address || !account) return false

  //   const balance = feeToken.isNative ? nativeBalances[account] : getTokenBalance(feeToken.address)

  //   // If no balance, wallet is not connected or we are unable to fetch balances
  //   if (!balance) return false

  //   // TODO: Check formatting here, like if decimals are a problem
  //   return balance.lessThan(BigInt(feeToken.estimatedFinalFeeTokenAmount))
  // }, [feeToken, account, nativeBalances, getTokenBalance])

  const Row = ({ data, index, style }) => {
    const item = data[index] as PaymasterToken

    const disabled = useMemo(
      () =>
        account
          ? (item.isNative && (!nativeBalances[account] || formatAmount(nativeBalances[account]) === '0')) ||
            (item.isToken && (!getTokenBalance(item.address) || formatAmount(getTokenBalance(item.address)) === '0'))
          : false,
      [item],
    )

    const {
      targetRef: innerTargetRef,
      tooltip: innerTooltip,
      tooltipVisible: innerTooltipVisible,
    } = useTooltip(<>{item.markup && item.markup.replace('-', '')} discount on this gas fee token</>)

    return (
      <FixedHeightRow style={style} onClick={() => !disabled && onTokenSelected(item)} $disabled={disabled}>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Flex alignItems="center">
            <StyledLogo
              size="20px"
              srcs={[item && item.logoURI ? item.logoURI : ``]}
              alt={`${item ? item?.symbol : 'ETH'}`}
              width="20px"
            />
            <Column marginLeft="12px">
              <Text bold>
                {item.symbol} &nbsp;
                {item.markup && <Badge ref={!disabled ? innerTargetRef : null}>⛽️ {item.markup}</Badge>}
              </Text>
              <Text color="textSubtle" maxWidth="200px" ellipsis small>
                {item.name}
              </Text>
            </Column>
          </Flex>

          {(account && nativeBalances[account]) || getTokenBalance(item.address) ? (
            <StyledBalanceText>
              <NumberDisplay
                value={
                  item.isNative && account
                    ? formatAmount(nativeBalances[account])
                    : formatAmount(getTokenBalance(item.address))
                }
              />
            </StyledBalanceText>
          ) : (
            <ArrowForwardIcon />
          )}
        </Flex>
        {innerTooltipVisible && innerTooltip}
      </FixedHeightRow>
    )
  }

  return (
    <>
      <GasTokenSelectButton
        className="open-gas-token-select-button"
        data-dd-action-name="Select token for gas"
        selected={!!feeToken}
        onClick={onSelectorButtonClick}
      >
        <Flex alignItems="center">
          <div style={{ position: 'relative' }}>
            <StyledLogo
              size="20px"
              srcs={[feeToken && feeToken.logoURI ? feeToken.logoURI : ``]}
              alt={`${feeToken ? feeToken?.symbol : 'ETH'}`}
              width="20px"
            />
            <p style={{ position: 'absolute', bottom: '-2px', right: '-6px', fontSize: '14px' }}>⛽️</p>
          </div>

          <Text marginLeft={2} fontSize={14} bold>
            {(feeToken && feeToken.symbol && feeToken.symbol.length > 10
              ? `${feeToken.symbol.slice(0, 4)}...${feeToken.symbol.slice(
                  feeToken.symbol.length - 5,
                  feeToken.symbol.length,
                )}`
              : feeToken?.symbol) || 'ETH'}
          </Text>
          <ArrowDropDownIcon marginLeft={1} />
        </Flex>
      </GasTokenSelectButton>

      {/* {account && (
          <BalanceText>
            {getTokenBalance(feeToken.address) || (account && nativeBalances[account]) ? (
              <Flex alignItems="center">
                <span style={{ marginTop: '2px' }}>
                  {t('Balance: %balance%', {
                    balance:
                      feeToken?.isNative && account
                        ? formatAmount(nativeBalances[account])
                        : formatAmount(getTokenBalance(feeToken.address)),
                  })}
                </span>
                {isInsufficientBalanceForGas && (
                  <div ref={targetRef}>
                    <WarningIcon width={16} marginLeft={1} color="#ED4B9E" />
                  </div>
                )}
              </Flex>
            ) : (
              <CircleLoader />
            )}
            {tooltipVisible && tooltip}
          </BalanceText>
        )} */}

      <ModalV2 onDismiss={onDismiss} isOpen={isOpen} closeOnOverlayClick>
        <StyledModalContainer>
          <ModalHeader style={{ border: 'none' }}>
            <ModalTitle>
              <Heading padding={2}>
                <Flex>
                  <span>{t('Select token for gas')}</span>
                  <QuestionHelper
                    text={
                      <>
                        <Text mb="12px">
                          <Text bold display="inline-block">
                            {t('Select any ERC20 token to pay for the gas fee.')}
                          </Text>
                          <br />
                          <br />
                          {t('Pay for network fees with any asset from the list below.')}
                          <br />
                          {t('Make sure you have at least $1 worth of the token.')}
                        </Text>
                      </>
                    }
                    ml="6px"
                    mt="1px"
                    placement="top"
                  />
                </Flex>
              </Heading>
            </ModalTitle>
            <ModalCloseButton onDismiss={onDismiss} />
          </ModalHeader>
          <StyledModalBody>
            <FixedSizeList
              height={400}
              itemData={tokenList.toSorted(tokenListSortComparator)}
              itemCount={tokenList.length}
              itemSize={56}
              width="100%"
              itemKey={itemKey}
              style={{ marginTop: '1px' }}
            >
              {Row}
            </FixedSizeList>
            <StyledFooterText>
              <Flex justifyContent="center" alignItems="center">
                <span>{t('Powered by Zyfi Paymaster')}</span>
                <Image
                  src="/images/swap/zyfi-logo.png"
                  alt="Zyfi Logo"
                  width={18}
                  height={18}
                  style={{ marginLeft: '5px' }}
                />
              </Flex>
            </StyledFooterText>
          </StyledModalBody>
        </StyledModalContainer>
      </ModalV2>
    </>
  )
}

export default GasTokenModal
