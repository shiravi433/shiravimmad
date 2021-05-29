import React from 'react'
import { Flex, Text, IconButton, AddIcon, MinusIcon, Heading, useModal, Skeleton, Button } from '@rug-zombie-libs/uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber, formatNumber } from 'utils/formatBalance'
import { Pool } from 'state/types'
import { VaultFees } from 'hooks/cakeVault/useGetVaultFees'
import { VaultUser } from 'views/Graves/types'
import Web3 from 'web3'
import NotEnoughTokensModal from '../../PoolCard/Modals/NotEnoughTokensModal'
import { convertSharesToCake } from '../../../helpers'
import GraveStakeModal from '../GraveStakeModal'
import { GraveConfig } from '../../../../../config/constants/types'
import tokens from '../../../../../config/constants/tokens'
import { BIG_TEN } from '../../../../../utils/bigNumber'

interface HasStakeActionProps {
  grave: GraveConfig
  stakingTokenBalance: BigNumber
  zombiePrice: BigNumber
  stakingMax: BigNumber
  userData: any
  account: string
  web3: Web3
}

const IsStakedActions: React.FC<HasStakeActionProps> = ({
  grave,
  stakingTokenBalance,
  zombiePrice,
  stakingMax,
  userData,
  account,
  web3
}) => {

  const stakedDollarValue = zombiePrice.times(userData.zombieStaked)

  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={tokens.zmbe.symbol} />)

  const zombieAsDisplayBalance = new BigNumber(userData.zombieStaked)

  const [onPresentStake] = useModal(
    <GraveStakeModal
      account={account}
      grave={grave}
      userData={userData}
      stakingMax={stakingMax}
      stakingTokenPrice={zombiePrice}
      web3={web3}
    />,
  )

  const [onPresentUnstake] = useModal(
    <GraveStakeModal
      account={account}
      grave={grave}
      stakingMax={stakingMax}
      stakingTokenPrice={zombiePrice}
      userData={userData}
      isRemovingStake
      web3={web3}
    />,
  )
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column">
        <Heading>{zombieAsDisplayBalance.div(BIG_TEN.pow(18)).toString()}</Heading>
        <Text fontSize="12px" color="textSubtle">{`~${
          zombiePrice ? stakedDollarValue : <Skeleton mt="1px" height={16} width={64} />
        } USD`}</Text>
      </Flex>
       <Flex>
         <Button onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}>Stake</Button>
       </Flex>
    </Flex>
  )
}

export default IsStakedActions
