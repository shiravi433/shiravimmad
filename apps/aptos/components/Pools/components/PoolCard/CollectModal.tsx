import { Pool } from '@pancakeswap/uikit'
import useHarvestPool from '../../hooks/useHarvestPool'
import CollectModalContainer from './CollectModalContainer'

export const CollectModal = ({
  sousId,
  stakingTokenAddress,
  earningTokenAddress,
  ...rest
}: React.PropsWithChildren<
  Pool.CollectModalProps & {
    earningTokenAddress: string
    stakingTokenAddress: string
  }
>) => {
  const { onReward } = useHarvestPool({ stakingTokenAddress, earningTokenAddress, sousId })

  return <CollectModalContainer onReward={onReward} {...rest} />
}

export default CollectModal
