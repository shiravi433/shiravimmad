import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardFooter, Heading, ChevronDownIcon, ChevronUpIcon, } from '@rug-zombie-libs/uikit'


const StyleDetails = styled.div`
  display: flex;
  justify-content: center;
`
const StyleCursorPointer = styled.div`
  cursor: pointer;
  display: flex;
`

const Styleinfo = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`
const StyleCardHeader = styled.div `
  width: 100%;
  height: 350px;
  padding: 0;
  background: #111820;
`
interface nftData {
  id: any,
  name: string,
  symbol: string,
  address: string,
  totalSupply: any,
  path: string,
  type: string,
  rarity: string,
}
interface CollectiblesCardProps {
  nft: nftData
}

const CollectiblesCard: React.FC<CollectiblesCardProps> = ({ nft }: CollectiblesCardProps) => {

  const { id, name, symbol, address, path, type, rarity, } = nft;
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Card className="card-active">
        <StyleCardHeader>
          {type === 'image' ? <img
            src={path} alt='test'
            style={{ width: '100%', height: '100%' }} /> :
            <video width="100%" height="100%" autoPlay>
              <source src={path} type="video/mp4" />
            </video>}
        </StyleCardHeader>
        <CardBody>
          <Heading as='h2' fontSize="20px">{name}</Heading>
        </CardBody>
        <CardFooter>
          <StyleDetails>
            <StyleCursorPointer onClick={toggleOpen}>
              Details
                  {
                isOpen ? <ChevronUpIcon color="text" ml="10px" />
                  : <ChevronDownIcon color="text" ml="10px" />
              }
            </StyleCursorPointer>
          </StyleDetails>
          {
            isOpen &&
            <Styleinfo>
              <p>
                {name}
              </p>
            </Styleinfo>
          }
        </CardFooter>
      </Card>
    </div>
  )
}

export default CollectiblesCard;