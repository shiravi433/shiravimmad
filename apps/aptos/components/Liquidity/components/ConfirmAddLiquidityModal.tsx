import React, { useCallback } from 'react'
import { Coin, Currency, CurrencyAmount, Percent, Price } from '@pancakeswap/aptos-swap-sdk'
import { InjectedModalProps, Button } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import TransactionConfirmationModal, {
  ConfirmationModalContent,
  TransactionErrorContent,
} from 'components/TransactionConfirmationModal'
import _toNumber from 'lodash/toNumber'
import { AddLiquidityModalHeader, PairDistribution } from './common'
import { CurrencySelectorValue } from '../hooks/useCurrencySelectRoute'
import { Field } from '../type'

interface ConfirmAddLiquidityModalProps {
  title: string
  customOnDismiss: () => void
  attemptingTxn: boolean
  hash?: string
  noLiquidity: boolean
  liquidityErrorMessage?: string
  price: Price<Currency, Currency> | undefined
  parsedAmounts: { [field in Field]?: CurrencyAmount<Currency> }
  onAdd: () => void
  poolTokenPercentage: Percent | undefined
  liquidityMinted: CurrencyAmount<Currency> | undefined
  currencyToAdd: Coin | undefined
  isStable?: boolean
  currencies: CurrencySelectorValue
}

const ConfirmAddLiquidityModal: React.FC<
  React.PropsWithChildren<InjectedModalProps & ConfirmAddLiquidityModalProps>
> = ({
  title,
  onDismiss,
  customOnDismiss,
  attemptingTxn,
  hash,
  price,
  noLiquidity,
  liquidityErrorMessage,
  onAdd,
  poolTokenPercentage,
  liquidityMinted,
  parsedAmounts,
  currencies,
}) => {
  const { t } = useTranslation()

  const pendingText = t('Supplying %amountA% %symbolA% and %amountB% %symbolB%', {
    amountA: parsedAmounts[Field.CURRENCY_A]?.toSignificant(8) ?? '',
    symbolA: currencies?.currencyA?.symbol ?? '',
    amountB: parsedAmounts[Field.CURRENCY_B]?.toSignificant(8) ?? '',
    symbolB: currencies?.currencyB?.symbol ?? '',
  })

  const percent = 0.5

  const modalHeader = useCallback(() => {
    return (
      <AddLiquidityModalHeader
        liquidityMinted={liquidityMinted}
        poolTokenPercentage={poolTokenPercentage}
        price={price}
        noLiquidity={noLiquidity}
        currencies={currencies}
      >
        <PairDistribution
          title={t('Input')}
          percent={percent}
          currencies={currencies}
          currencyAValue={parsedAmounts[Field.CURRENCY_A]?.toSignificant(8)}
          currencyBValue={parsedAmounts[Field.CURRENCY_B]?.toSignificant(8)}
        />
      </AddLiquidityModalHeader>
    )
  }, [percent, liquidityMinted, noLiquidity, parsedAmounts, poolTokenPercentage, price, t, currencies])

  const modalBottom = useCallback(() => {
    return (
      <Button width="100%" onClick={onAdd} mt="20px">
        {noLiquidity ? t('Create Pool & Supply') : t('Confirm Supply')}
      </Button>
    )
  }, [noLiquidity, onAdd, t])

  const confirmationContent = useCallback(
    () =>
      liquidityErrorMessage ? (
        <TransactionErrorContent onDismiss={onDismiss} message={liquidityErrorMessage} />
      ) : (
        <ConfirmationModalContent topContent={modalHeader} bottomContent={modalBottom} />
      ),
    [onDismiss, modalBottom, modalHeader, liquidityErrorMessage],
  )

  return (
    <TransactionConfirmationModal
      title={title}
      onDismiss={onDismiss}
      customOnDismiss={customOnDismiss}
      attemptingTxn={attemptingTxn}
      hash={hash}
      content={confirmationContent}
      pendingText={pendingText}
    />
  )
}

export default ConfirmAddLiquidityModal
