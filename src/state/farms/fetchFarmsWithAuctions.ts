import { FARM_AUCTION_HOSTING_IN_SECONDS } from 'config/constants'
import farmAuctionAbi from 'config/abi/farmAuction.json'
import { getFarmAuctionContract } from 'utils/contractHelpers'
import { multicallv2 } from 'utils/multicall'
import { ethersToBigNumber } from 'utils/bigNumber'
import { BSC_BLOCK_TIME } from 'config'
import { add, sub } from 'date-fns'
import { sortAuctionBidders } from '../../views/FarmAuction/helpers'

const fetchFarmsWithAuctions = async (
  currentBlock: number,
): Promise<{ winnerFarms: string[]; auctionHostingEndDate: string }> => {
  const farmAuctionContract = getFarmAuctionContract()
  const currentAuctionId = await farmAuctionContract.currentAuctionId()
  const [auctionData, [auctionBidders]] = await multicallv2(
    farmAuctionAbi,
    [
      {
        address: farmAuctionContract.address,
        name: 'auctions',
        params: [currentAuctionId],
      },
      {
        address: farmAuctionContract.address,
        name: 'viewBidsPerAuction',
        params: [currentAuctionId, 0, 500],
      },
    ],
    { requireSuccess: false },
  )
  const blocksSinceEnd = currentBlock - auctionData.endBlock.toNumber()
  if (blocksSinceEnd > 0) {
    const secondsSinceEnd = blocksSinceEnd * BSC_BLOCK_TIME
    const currentAuctionEndDate = sub(new Date(), { seconds: secondsSinceEnd })
    const auctionHostingEndDate = add(currentAuctionEndDate, {
      seconds: FARM_AUCTION_HOSTING_IN_SECONDS,
    }).toJSON()
    if (secondsSinceEnd > FARM_AUCTION_HOSTING_IN_SECONDS) {
      return { winnerFarms: [], auctionHostingEndDate }
    }
    const sortedBidders = sortAuctionBidders(auctionBidders)
    const leaderboardThreshold = ethersToBigNumber(auctionData.leaderboardThreshold)
    const winnerFarms = sortedBidders
      .filter((bidder) => bidder.amount.gt(leaderboardThreshold))
      .map((bidder) => bidder.lpAddress)
    return {
      winnerFarms,
      auctionHostingEndDate,
    }
  }

  return { winnerFarms: [], auctionHostingEndDate: null }
}

export default fetchFarmsWithAuctions
