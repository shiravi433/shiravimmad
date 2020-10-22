import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useModal from '../../../hooks/useModal'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { useMultiClaimLottery } from '../../../hooks/useBuyLottery'

import useTickets, { useTotalClaim } from '../../../hooks/useTickets'
import WalletProviderModal from '../../../components/WalletProviderModal'
import AccountModal from '../../../components/TopBar/components/AccountModal'
import { TranslateString } from '../../../utils/translateTextHelpers'
import { LotteryStates } from "../../../lottery/types";

import MyTicketsModal from "./myTicketsModal";

interface PrizeProps {
  state: boolean
}

const Prize: React.FC<PrizeProps> = ({state}) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [requesteClaim, setRequestedClaim] = useState(false)
  const { account } = useWallet()

  const tickets = useTickets()
  const [onPresentMyTickets] = useModal(
      <MyTicketsModal myTicketNumbers={tickets}/>,
  )

  const claimAmount = useTotalClaim()

  const { onMultiClaim } = useMultiClaimLottery()

  const handleClaim = useCallback(async () => {
    try {
      setRequestedClaim(true)
      const txHash = await onMultiClaim()
      // user rejected tx or didn't go thru
      if (txHash) {
        setRequestedClaim(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [onMultiClaim, setRequestedClaim])

  const [onPresentAccountModal] = useModal(<AccountModal />)

  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )
  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])


  return (
    <div style={{margin: '5px', width: '400px'}}>
        <Card>
            <CardContent>
                <StyledCardContentInner>
                    <StyledCardHeader>
                        <CardIcon>🎁</CardIcon>
                        <Value value={getBalanceNumber(claimAmount)}/>
                        <Label text={`CAKE prizes to be claimed!`}/>
                    </StyledCardHeader>
                    {
                        state === LotteryStates.WINNERS_ANNOUNCED &&
                        <StyledCardActions>
                            {
                                !account &&
                                <Button onClick={handleUnlockClick} size="md" text="Unlock Wallet"/>
                            }
                            {
                                account &&
                                <Button disabled={getBalanceNumber(claimAmount) == 0}
                                        onClick={null}
                                        size="md"
                                        text="Claim prizes"/>
                            }
                        </StyledCardActions>
                    }
                    {
                        (state === LotteryStates.BUY_TICKETS_OPEN) &&
                        <StyledCardActions>
                            <Button disabled={true}
                                    onClick={null}
                                    size="md"
                                    text="Claim prizes after winners announcement"/>

                        </StyledCardActions>
                    }
                    {account &&
                      <MyTicketsP onClick={onPresentMyTickets}>View your tickets</MyTicketsP>
                    }
                </StyledCardContentInner>
            </CardContent>
        </Card>
    </div>
  )
}


const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: 100%;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

const MyTicketsP = styled.div`
  cursor: pointer;
  margin-top: 1.35em;
  color: ${(props) => props.theme.colors.secondary};
`

export default Prize
