export async function fetchMoonpayQuote(baseAmount: number, currencyCode: string, outputCurrency: string) {
  // Fetch data from endpoint 1
  const response = await fetch(
    `https://api.moonpay.com/v3/currencies/${outputCurrency.toLowerCase()}/buy_quote/?apiKey=pk_live_Ch5fat39X8NvMZwih2k7hK4sDrKanSPz&baseCurrencyAmount=${baseAmount}&&baseCurrencyCode=${currencyCode.toLowerCase()}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
  const result = response.json()
  return result
}

export async function fetchMercuryoQuote(payload: any) {
  // Fetch data from endpoint 2
  const response = await fetch('https://pcs-onramp-api.com/fetch-mercuryo-quote', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })
  const result = await response.json()
  return result.result.result
}

export async function fetchBinanceConnectQuote(payload: any) {
  const response = await fetch('https://pcs-onramp-api.com/fetch-bsc-quote', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })
  const result = response.json()
  return result
}
