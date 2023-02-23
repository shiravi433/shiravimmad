import { TradeType } from '@pancakeswap/sdk'
import { Trade, RouteType } from '@pancakeswap/smart-router/evm'

import { ROUTER_ADDRESS } from 'config/constants/exchange'

export function useRouterAddress(trade?: Trade<TradeType>) {
  if (!trade) {
    return ''
  }

  const { routes, inputAmount } = trade
  const {
    currency: { chainId },
  } = inputAmount
  if (routes.length === 1 && routes[0].type === RouteType.V2) {
    return ROUTER_ADDRESS[chainId]
  }
  // FIXME should use the new address
  return ROUTER_ADDRESS[chainId]
}
