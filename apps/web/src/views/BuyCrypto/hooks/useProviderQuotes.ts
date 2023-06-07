// will cleanup urls later
const MOONPAY_EBDPOINT = `https://api.moonpay.com/v3/currencies/`
const MERCURYO_ENDPOINT = `https://sandbox-api.mrcr.io/v1.6/widget/buy/rate`

export async function fetchMoonpayQuote(
  baseAmount: number,
  currencyCode: string,
  outputCurrency: string,
): Promise<Response> {
  // Fetch data from endpoint 1
  const response = await fetch(
    `${MOONPAY_EBDPOINT}${outputCurrency.toLowerCase()}/buy_quote/?apiKey=pk_test_1Ibe44lMglFVL8COOYO7SEKnIBrzrp54&baseCurrencyAmount=${baseAmount}&&baseCurrencyCode=${currencyCode.toLowerCase()}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
  return response
}

export async function fetchMercuryoQuote(
  fiatCurrency: string,
  cryptoCurrency: string,
  amount: number,
): Promise<Response> {
  // Fetch data from endpoint 2
  const response = await fetch(
    `${MERCURYO_ENDPOINT}?from=${fiatCurrency.toUpperCase()}&to=${cryptoCurrency.toUpperCase()}&amount=${amount}&widget_id=625376b4-cf28-43b8-b836-550cd558c431`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
  return response
}

// for bsc connect we need to fetch our own custom api endpoint as even get requests require
// sig validation
export async function fetchBinanceConnectQuote(payload: any): Promise<Response> {
  const response = await fetch('/api/onramp-url-sign/fetch-bsc-connect-quote', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return response
}
