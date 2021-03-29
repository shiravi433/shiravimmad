import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { useProfile } from 'state/hooks'
import { Card, CardHeader, CardBody, Flex, Button } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { PrizesIcon, RulesIcon } from './svgs'
import {
  DARKBG,
  DARKFILL,
  MIDBLUEBG,
  MIDBLUEFILL,
  LIGHTBLUEBG,
  LIGHTBLUEFILL,
} from './components/Section/sectionStyles'
import Countdown from './components/Countdown'
import RibbonWithImage from './components/RibbonWithImage'
import HowToJoin from './components/HowToJoin'
import BattleBanner from './components/BattleBanner'
import Section from './components/Section'
import PrizesInfo from './components/PrizesInfo'
import Rules from './components/Rules'
import { CompetitionCountdownContextProvider } from './contexts/CompetitionCountdownContext'

const SampleCard = () => (
  <Card>
    <CardHeader>A header</CardHeader>
    <CardBody>
      <Flex flexDirection="column">
        Some body stuff
        <Button mt="8px" onClick={() => console.log('clicked')}>
          Click me
        </Button>
      </Flex>
    </CardBody>
  </Card>
)

const CompetitionPage = styled.div`
  min-height: calc(100vh - 64px);
`

const StyledFlex = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`

const StyledSection = styled(Section)`
  padding: 96px 0 24px 0;
`

const TradingCompetition = () => {
  const { account } = useWeb3React()
  const { profile } = useProfile()
  const registered = true
  const hasCompetitionStarted = false

  return (
    <CompetitionCountdownContextProvider>
      <CompetitionPage>
        <Section backgroundStyle={DARKBG} svgFill={DARKFILL} index={4}>
          <StyledFlex>
            <Countdown />
            <BattleBanner />
          </StyledFlex>
        </Section>
        <Section
          backgroundStyle={MIDBLUEBG}
          svgFill={MIDBLUEFILL}
          index={3}
          intersectComponent={
            <RibbonWithImage imageComponent={<PrizesIcon width="175px" />} ribbonDirection="up">
              Prizes
            </RibbonWithImage>
          }
        >
          {!hasCompetitionStarted ? <HowToJoin /> : <SampleCard />}
        </Section>
        <StyledSection backgroundStyle={LIGHTBLUEBG} svgFill={LIGHTBLUEFILL} index={2} noIntersection>
          <PrizesInfo />
        </StyledSection>
        <Section
          index={3}
          intersectionPosition="top"
          intersectComponent={
            <RibbonWithImage imageComponent={<RulesIcon width="175px" />} ribbonDirection="up">
              Rules
            </RibbonWithImage>
          }
        >
          <Rules />
        </Section>
        <Section backgroundStyle={DARKBG} svgFill={DARKFILL} index={4} intersectionPosition="top">
          <SampleCard />
        </Section>
      </CompetitionPage>
    </CompetitionCountdownContextProvider>
  )
}

export default TradingCompetition
