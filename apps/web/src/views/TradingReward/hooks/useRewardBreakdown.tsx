import useSWR from 'swr'
import { ChainId } from '@pancakeswap/sdk'
import BigNumber from 'bignumber.js'
import { useAccount } from 'wagmi'
import { getTradingRewardContract } from 'utils/contractHelpers'
import { TRADING_REWARD_API } from 'config/constants/endpoints'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { Token } from '@pancakeswap/swap-sdk-core'
import { farmsV3ConfigChainMap } from '@pancakeswap/farms/constants/v3'
import { CampaignIdInfoResponse } from 'views/TradingReward/hooks/useCampaignIdInfo'
import { UserCampaignInfoDetail } from 'views/TradingReward/hooks/useAllUserCampaignInfo'
import { AllTradingRewardPairDetail, RewardInfo } from 'views/TradingReward/hooks/useAllTradingRewardPair'
import { getBalanceAmount } from '@pancakeswap/utils/formatBalance'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'

interface UseRewardBreakdownProps {
  allUserCampaignInfo: UserCampaignInfoDetail[]
  allTradingRewardPairData: AllTradingRewardPairDetail
  rewardInfo: { [key in string]: RewardInfo }
}

export interface RewardBreakdownPair {
  address: string
  lpSymbol: string
  token: Token
  quoteToken: Token
  yourVolume: number
  rewardEarned: number
  yourTradingFee: string
  feeAmount: number
}

export interface RewardBreakdownDetail {
  campaignId: string
  campaignStart: number
  campaignClaimTime: number
  pairs: RewardBreakdownPair[]
}

export interface RewardBreakdown {
  isFetching: boolean
  data: RewardBreakdownDetail[]
}

const useRewardBreakdown = ({
  allUserCampaignInfo,
  allTradingRewardPairData,
  rewardInfo,
}: UseRewardBreakdownProps): RewardBreakdown => {
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()
  const farms = farmsV3ConfigChainMap[chainId as ChainId]
  const tradingRewardContract = getTradingRewardContract(chainId)
  const currentDate = new Date().getTime() / 1000

  const { data: rewardBreakdownList, isLoading } = useSWR(
    ['/rewards-breakdown', allUserCampaignInfo, allTradingRewardPairData, account],
    async () => {
      try {
        const dataInfo = await Promise.all(
          allTradingRewardPairData.campaignIdsIncentive.map(async (incentive) => {
            const response = await fetch(
              `${TRADING_REWARD_API}/campaign/chainId/${chainId}/campaignId/${incentive.campaignId}/address/0x`,
            )
            const { data: result }: { data: CampaignIdInfoResponse } = await response.json()
            const userInfo = allUserCampaignInfo.find(
              (user) => user.campaignId.toLowerCase() === incentive.campaignId.toLowerCase(),
            )
            const reward = rewardInfo?.[incentive.campaignId] ?? {
              rewardPrice: 0,
              rewardTokenDecimal: 18,
            }

            const pairs = await Promise.all(
              result?.tradingFeeArr?.map(async (volume) => {
                const pairInfo = farms.find((farm) => farm.lpAddress.toLowerCase() === volume.pool.toLowerCase())
                const user = userInfo?.tradingFeeArr?.find(
                  (arr) => arr.pool.toLowerCase() === volume.pool.toLowerCase(),
                )
                const canClaimResponse = !user?.volume
                  ? BIG_ZERO
                  : await tradingRewardContract.canClaim(
                      userInfo?.campaignId,
                      account,
                      new BigNumber(user?.volume?.toFixed(2)).times(1e18).toString(),
                    )

                const rewardPrice = new BigNumber(reward.rewardPrice).div(reward.rewardTokenDecimal)
                const rewardEarned =
                  incentive.campaignClaimTime - currentDate > 0
                    ? user?.estimateRewardUSD || 0
                    : new BigNumber(getBalanceAmount(new BigNumber(canClaimResponse)).times(rewardPrice)).toNumber() ||
                      0

                return {
                  address: volume.pool,
                  lpSymbol: pairInfo?.lpSymbol ?? '',
                  token: pairInfo?.token,
                  quoteToken: pairInfo?.quoteToken,
                  yourVolume: user?.volume ?? 0,
                  rewardEarned,
                  yourTradingFee: user?.tradingFee ?? '0',
                  feeAmount: pairInfo?.feeAmount ?? 0,
                }
              }),
            )

            return {
              campaignId: incentive.campaignId,
              campaignStart: incentive?.campaignStart ?? 0,
              campaignClaimTime: incentive?.campaignClaimTime ?? 0,
              pairs,
            }
          }),
        )

        return dataInfo
      } catch (error) {
        console.info(`Fetch Reward Breakdown Error: ${error}`)
        return []
      }
    },
    {
      fallbackData: [],
    },
  )

  return {
    isFetching: isLoading,
    data: rewardBreakdownList,
  }
}

export default useRewardBreakdown
