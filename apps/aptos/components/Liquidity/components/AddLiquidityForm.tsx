import { CurrencyAmount, Token } from '@pancakeswap/aptos-swap-sdk'
import { useTranslation } from '@pancakeswap/localization'

import { Liquidity as LiquidityUI, Column, AddIcon, CardBody, AutoColumn, Button } from '@pancakeswap/uikit'
import { CurrencyInputPanel } from 'components/CurrencyInputPanel'
import AddLiquidityButton from 'components/Liquidity/components/AddLiquidityButton'
import { PairState } from 'hooks/usePairs'
import { useContext, useEffect, useMemo } from 'react'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { useDerivedMintInfo } from '../hooks/useAddLiquidityForm'
import { CurrencySelectorContext } from '../hooks/useCurrencySelectRoute'
import { MintPairContext } from '../hooks/useMintPair'
import { useMintLiquidityStateAndHandlers } from '../state/add'
import { Field } from '../type'
// import AprRow from './AprRow'
import FarmPriceBar from './FarmPriceBar'
import PricePoolShareSection from './PricePoolShareSection'
import SlippageSection from './SlippageSection'

const { FirstLP } = LiquidityUI

export default function AddLiquidityForm({ notSupportPair }) {
  const { t } = useTranslation()
  const { currencyA, currencyB, handleCurrencyASelect, handleCurrencyBSelect } = useContext(CurrencySelectorContext)
  const { pairState, currencyBalances, error, pair, noLiquidity, totalSupply } = useContext(MintPairContext)
  const { poolTokenPercentage, price, parsedAmounts, addError, liquidityMinted } = useDerivedMintInfo({
    noLiquidity,
    totalSupply,
  })

  const [{ typedValue, otherTypedValue, independentField }, { onFieldAInput, onFieldBInput, resetForm }] =
    useMintLiquidityStateAndHandlers(noLiquidity)

  const dependentField = independentField === Field.CURRENCY_A ? Field.CURRENCY_B : Field.CURRENCY_A

  // get formatted amounts
  const formattedAmounts = useMemo(
    () => ({
      [independentField]: typedValue,
      [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
    }),
    [dependentField, independentField, noLiquidity, otherTypedValue, parsedAmounts, typedValue],
  )

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: CurrencyAmount<Token> } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {},
  )

  useEffect(() => {
    // resetForm when unmount
    return () => resetForm()
  }, [resetForm])

  return (
    <CardBody>
      <AutoColumn gap="20px">
        {noLiquidity ? <FirstLP /> : null}
        <CurrencyInputPanel
          onCurrencySelect={handleCurrencyASelect}
          id="swap-currencyA-input"
          currency={currencyA}
          otherCurrency={currencyB}
          value={formattedAmounts[Field.CURRENCY_A]}
          onUserInput={onFieldAInput}
          showMaxButton
          onMax={() => {
            onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
          }}
        />
        <Column width="100%" alignItems="center">
          <AddIcon width="16px" />
        </Column>
        <CurrencyInputPanel
          onCurrencySelect={handleCurrencyBSelect}
          id="swap-currency-input"
          currency={currencyB}
          otherCurrency={currencyA}
          value={formattedAmounts[Field.CURRENCY_B]}
          onUserInput={onFieldBInput}
          showMaxButton
          onMax={() => {
            onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
          }}
        />

        {currencyA && currencyB && pairState !== PairState.INVALID ? (
          <PricePoolShareSection
            noLiquidity={noLiquidity}
            farmPriceBar={
              <FarmPriceBar
                currencyA={currencyA}
                currencyB={currencyB}
                poolTokenPercentage={poolTokenPercentage}
                noLiquidity={noLiquidity}
                price={price}
              />
            }
          />
        ) : null}
        <SlippageSection />
        {/* <AprRow lpApr7d={0} /> */}
        {notSupportPair ? (
          <Button disabled mb="4px">
            {t('Unsupported Asset')}
          </Button>
        ) : (
          <AddLiquidityButton
            onFieldAInput={onFieldAInput}
            price={price}
            poolTokenPercentage={poolTokenPercentage}
            liquidityMinted={liquidityMinted}
            noLiquidity={noLiquidity}
            parsedAmounts={parsedAmounts}
            errorText={error ?? addError}
            liquidityToken={pair?.liquidityToken}
          />
        )}
      </AutoColumn>
    </CardBody>
  )
}
