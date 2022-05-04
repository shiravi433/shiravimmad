import { createContext, useContext } from 'react'
import addresses from 'config/constants/contracts'

import { GRAPH_API_PREDICTION } from 'config/constants/endpoints'
import { getAddress } from 'utils/addressHelpers'
import { PredictionConfig } from 'state/types'

export const config: PredictionConfig = {
  address: getAddress(addresses.predictions),
  api: GRAPH_API_PREDICTION,
}

export const ConfigContext = createContext<PredictionConfig>(config)

export function useConfig() {
  return useContext(ConfigContext)
}

export default function ConfigProvider({ children }) {
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}
