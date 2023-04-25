import { useMemo } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { Flex, Text } from '@pancakeswap/uikit'
import {
  StyledVolumeText,
  RightBox,
  MiddleBox,
  LeftBox,
  Wrapper,
  Inner,
  StyledVolumeFlex,
} from 'views/TradingCompetition/components/TeamRanks/Podium/styles'
import { PodiumBase } from 'views/TradingCompetition/svgs'
import PodiumAvatar from 'views/AffiliatesProgram/components/LeaderBoard/PodiumAvatar'
import NewUsers from 'views/AffiliatesProgram/components/LeaderBoard/NewUsers'
import { ListType } from 'views/AffiliatesProgram/hooks/useLeaderboard'
import { formatNumber } from '@pancakeswap/utils/formatBalance'

interface PodiumProps {
  list: ListType[]
}

const Podium: React.FC<React.PropsWithChildren<PodiumProps>> = ({ list }) => {
  const { t } = useTranslation()
  const firstThreeData = useMemo(() => list.slice(0, 3), [list])
  const firstUser = firstThreeData && firstThreeData[0]
  const secondUser = firstThreeData && firstThreeData[1]
  const thirdUser = firstThreeData && firstThreeData[2]

  return (
    <Wrapper margin="60px auto">
      <Inner>
        <Flex height="132px" position="relative">
          <LeftBox>
            <PodiumAvatar position={2} address={secondUser?.address} />
            <Text margin="auto auto 10px auto" maxWidth="80px" color="primary" bold textAlign="center" ellipsis>
              {secondUser?.nickName}
            </Text>
          </LeftBox>
          <MiddleBox>
            <PodiumAvatar position={1} address={firstUser?.address} />
            <Text margin="auto auto 10px auto" maxWidth="80px" color="primary" bold textAlign="center" ellipsis>
              {firstUser?.nickName}
            </Text>
          </MiddleBox>
          <RightBox>
            <PodiumAvatar position={3} address={thirdUser?.address} />
            <Text margin="auto auto 10px auto" maxWidth="80px" color="primary" bold textAlign="center" ellipsis>
              {thirdUser?.nickName}
            </Text>
          </RightBox>
        </Flex>
        <PodiumBase />
        <Flex justifyContent="space-between" mt="8px">
          <StyledVolumeFlex>
            <StyledVolumeText bold>{`$${formatNumber(
              Number(secondUser?.metric?.totalTradeVolumeUSD),
              0,
            )}`}</StyledVolumeText>
            <Text mb="12px" fontSize="12px" color="textSubtle">
              {t('Total Volume')}
            </Text>
            <NewUsers totalUsers={Number(secondUser?.metric?.totalUsers)} />
            <StyledVolumeText bold>{`$${formatNumber(
              Number(secondUser?.metric?.totalEarnFeeUSD),
              0,
            )}`}</StyledVolumeText>
            <Text fontSize="12px" color="textSubtle">
              {t('Commission')}
            </Text>
          </StyledVolumeFlex>
          <StyledVolumeFlex>
            <StyledVolumeText bold>{`$${formatNumber(
              Number(firstUser?.metric?.totalTradeVolumeUSD),
              0,
            )}`}</StyledVolumeText>
            <Text mb="12px" fontSize="12px" color="textSubtle">
              {t('Total Volume')}
            </Text>
            <NewUsers totalUsers={Number(firstUser?.metric?.totalUsers)} />
            <StyledVolumeText bold>{`$${formatNumber(
              Number(firstUser?.metric?.totalEarnFeeUSD),
              0,
            )}`}</StyledVolumeText>
            <Text fontSize="12px" color="textSubtle">
              {t('Commission')}
            </Text>
          </StyledVolumeFlex>
          <StyledVolumeFlex>
            <StyledVolumeText bold>{`$${formatNumber(
              Number(thirdUser?.metric?.totalTradeVolumeUSD),
              0,
            )}`}</StyledVolumeText>
            <Text mb="12px" fontSize="12px" color="textSubtle">
              {t('Total Volume')}
            </Text>
            <NewUsers totalUsers={Number(thirdUser?.metric?.totalUsers)} />
            <StyledVolumeText bold>{`$${formatNumber(
              Number(thirdUser?.metric?.totalEarnFeeUSD),
              0,
            )}`}</StyledVolumeText>
            <Text fontSize="12px" color="textSubtle">
              {t('Commission')}
            </Text>
          </StyledVolumeFlex>
        </Flex>
      </Inner>
    </Wrapper>
  )
}

export default Podium
