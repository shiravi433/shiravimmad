import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { getEarned, getMasterChefContract, getFarms } from '../sushi/utils'
import useSushi from './useSushi'
import useRefresh from './useRefresh'

export interface Farm {
  pid: number
  name: string
  lpSymbol: string
  lpAddress: string
  lpContract: Contract
  tokenAddress: string
  earnToken: string
  earnTokenAddress: string
  tokenSymbol: string
  multiplier: string
}

export interface FarmWithBalance extends Farm {
  balance: BigNumber
}

const useFarmsWithBalance = () => {
  const [farmsWithBalances, setFarmsWithBalances] = useState<FarmWithBalance[]>([])
  const { account } = useWallet()
  const sushi = useSushi()
  const farms = getFarms(sushi)
  const masterChefContract = getMasterChefContract(sushi)
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalances = async () => {
      const newList: Promise<FarmWithBalance>[] = farms.map(async (farm) => {
        const balance = await getEarned(masterChefContract, farm.pid, account)

        return {
          ...farm,
          balance: new BigNumber(balance),
        }
      })

      const results = await Promise.all(newList)
      setFarmsWithBalances(results)
    }

    if (account && masterChefContract && sushi) {
      fetchBalances()
    }
  }, [account, farms, masterChefContract, sushi, fastRefresh])

  return farmsWithBalances
}

export default useFarmsWithBalance
