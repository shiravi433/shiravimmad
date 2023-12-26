import { createContext, useContext } from 'react'
import { PredictionConfig } from '@pancakeswap/prediction'

export const ConfigContext = createContext<PredictionConfig | null>(null)

export function useConfig() {
  return useContext(ConfigContext)
}

export default function ConfigProvider({ children, config }) {
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}
