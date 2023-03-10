import { CommonBasesType } from 'components/SearchModal/types'

import { AutoColumn, Button, Dots, RowBetween, Text, Box, AutoRow, Flex } from '@pancakeswap/uikit'

import { CommitButton } from 'components/CommitButton'
import _isNaN from 'lodash/isNaN'
import CurrencyInputPanel from 'components/CurrencyInputPanel'

import { Field } from 'state/mint/actions'
import { ApprovalState } from 'hooks/useApproveCallback'

import { useIsExpertMode } from '@pancakeswap/utils/user'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from '@pancakeswap/localization'
import { LightGreyCard } from 'components/Card'

import { CurrencyLogo } from 'components/Logo'
import { useTotalUSDValue } from 'components/PositionCard'
import { CurrencyAmount } from '@pancakeswap/sdk'
import { BIG_ONE_HUNDRED } from '@pancakeswap/utils/bigNumber'
import { AddStableChildrenProps } from 'views/AddLiquidity/AddStableLiquidity'
import { useIsTransactionUnsupported, useIsTransactionWarning } from 'hooks/Trades'

import { HideMedium, MediumOnly, RightContainer } from './V3FormView'

export default function StableFormView({
  formattedAmounts,
  shouldShowApprovalGroup,
  approveACallback,
  approvalA,
  approvalB,
  approveBCallback,
  showFieldBApproval,
  showFieldAApproval,
  currencies,
  buttonDisabled,
  onAdd,
  onPresentAddLiquidityModal,
  errorText,
  onFieldAInput,
  onFieldBInput,
  poolTokenPercentage,
  pair,
  reserves,
  stableLpFee,
}: AddStableChildrenProps & {
  stableLpFee: number
}) {
  const addIsUnsupported = useIsTransactionUnsupported(currencies?.CURRENCY_A, currencies?.CURRENCY_B)
  const addIsWarning = useIsTransactionWarning(currencies?.CURRENCY_A, currencies?.CURRENCY_B)

  const { account, isWrongNetwork } = useActiveWeb3React()
  const { t } = useTranslation()
  const expertMode = useIsExpertMode()

  const reservedToken0 = CurrencyAmount.fromRawAmount(pair?.token0, reserves[0].toString())
  const reservedToken1 = CurrencyAmount.fromRawAmount(pair?.token0, reserves[1].toString())

  const totalLiquidityUSD = useTotalUSDValue({
    currency0: pair?.token0,
    currency1: pair?.token1,
    token0Deposited: reservedToken0,
    token1Deposited: reservedToken1,
  })

  let buttons = null
  if (addIsUnsupported || addIsWarning) {
    buttons = (
      <Button disabled mb="4px">
        {t('Unsupported Asset')}
      </Button>
    )
  } else if (!account) {
    buttons = <ConnectWalletButton width="100%" />
  } else if (isWrongNetwork) {
    buttons = <CommitButton />
  } else {
    buttons = (
      <AutoColumn gap="md">
        {shouldShowApprovalGroup && (
          <RowBetween style={{ gap: '8px' }}>
            {showFieldAApproval && (
              <Button onClick={approveACallback} disabled={approvalA === ApprovalState.PENDING} width="100%">
                {approvalA === ApprovalState.PENDING ? (
                  <Dots>{t('Enabling %asset%', { asset: currencies[Field.CURRENCY_A]?.symbol })}</Dots>
                ) : (
                  t('Enable %asset%', { asset: currencies[Field.CURRENCY_A]?.symbol })
                )}
              </Button>
            )}
            {showFieldBApproval && (
              <Button onClick={approveBCallback} disabled={approvalB === ApprovalState.PENDING} width="100%">
                {approvalB === ApprovalState.PENDING ? (
                  <Dots>{t('Enabling %asset%', { asset: currencies[Field.CURRENCY_B]?.symbol })}</Dots>
                ) : (
                  t('Enable %asset%', { asset: currencies[Field.CURRENCY_B]?.symbol })
                )}
              </Button>
            )}
          </RowBetween>
        )}
        <CommitButton
          variant={buttonDisabled ? 'danger' : 'primary'}
          onClick={() => (expertMode ? onAdd() : onPresentAddLiquidityModal())}
          disabled={buttonDisabled}
        >
          {errorText || t('Add')}
        </CommitButton>
      </AutoColumn>
    )
  }

  return (
    <>
      <AutoColumn>
        <Text mb="8px" bold fontSize="14px" textTransform="uppercase" color="secondary">
          Deposit Amount
        </Text>

        <CurrencyInputPanel
          disableCurrencySelect
          value={formattedAmounts[Field.CURRENCY_A]}
          onUserInput={onFieldAInput}
          showQuickInputButton
          showMaxButton
          currency={currencies[Field.CURRENCY_A]}
          id="add-liquidity-input-tokena"
          showCommonBases
          commonBasesType={CommonBasesType.LIQUIDITY}
        />

        <CurrencyInputPanel
          disableCurrencySelect
          value={formattedAmounts[Field.CURRENCY_B]}
          onUserInput={onFieldBInput}
          showQuickInputButton
          showMaxButton
          currency={currencies[Field.CURRENCY_B]}
          id="add-liquidity-input-tokenb"
          showCommonBases
          commonBasesType={CommonBasesType.LIQUIDITY}
        />
      </AutoColumn>
      <HideMedium>{buttons}</HideMedium>

      <RightContainer>
        <AutoColumn>
          <Box>
            <Text mb="8px" bold fontSize="14px" textTransform="uppercase" color="secondary">
              Pool Reserves
            </Text>
            <Text fontSize="24px" fontWeight={500}>
              $
              {totalLiquidityUSD
                ? totalLiquidityUSD.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : '-'}
            </Text>
            <LightGreyCard mr="4px">
              <AutoRow justifyContent="space-between" mb="8px">
                <Flex>
                  <CurrencyLogo currency={currencies[Field.CURRENCY_A]} />
                  <Text small color="textSubtle" id="remove-liquidity-tokenb-symbol" ml="4px">
                    {currencies[Field.CURRENCY_A]?.symbol}
                  </Text>
                </Flex>
                <Flex justifyContent="center">
                  <Text bold mr="4px">
                    {reservedToken0?.toSignificant(4)}
                  </Text>
                </Flex>
              </AutoRow>
              <AutoRow justifyContent="space-between">
                <Flex>
                  <CurrencyLogo currency={currencies[Field.CURRENCY_B]} />
                  <Text small color="textSubtle" id="remove-liquidity-tokenb-symbol" ml="4px">
                    {currencies[Field.CURRENCY_B]?.symbol}
                  </Text>
                </Flex>
                <Flex justifyContent="center">
                  <Text bold mr="4px">
                    {reservedToken1?.toSignificant(4)}
                  </Text>
                </Flex>
              </AutoRow>
            </LightGreyCard>
            <AutoRow justifyContent="space-between" mb="8px">
              <Text>Fee Rate: </Text>

              <Text>{BIG_ONE_HUNDRED.times(stableLpFee).toNumber()}%</Text>
            </AutoRow>
            <AutoRow justifyContent="space-between" mb="8px">
              <Text>Your share in pool: </Text>

              <Text>{poolTokenPercentage ? poolTokenPercentage?.toSignificant(4) : '-'}%</Text>
            </AutoRow>
          </Box>
          <MediumOnly>{buttons}</MediumOnly>
        </AutoColumn>
      </RightContainer>
    </>
  )
}
