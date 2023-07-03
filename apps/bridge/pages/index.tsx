import { useEffect, useState } from 'react'
import Script from 'next/script'
import styled, { useTheme } from 'styled-components'
import { Flex, Box } from '@pancakeswap/uikit'
import { LAYER_ZERO_JS } from 'components/layerZero/config'
import { LayerZeroWidget } from 'components/layerZero/LayerZeroWidget'
import AptosBridgeFooter from 'components/layerZero/AptosBridgeFooter'

const Page = styled(Box)`
  display: flex;
  height: 100%;
  height: calc(100vh - 56px);
  background: ${({ theme }) => theme.colors.backgroundAlt};

  ${({ theme }) => theme.mediaQueries.sm} {
    min-height: 1000px;
    background: ${({ theme }) => theme.colors.gradientBubblegum};
  }
`

const AptosBridge = () => {
  const theme = useTheme()
  const [show, setShow] = useState(false)

  // useEffect(() => {
  //   customElements.whenDefined('aptos-bridge').then(() => {
  //     window.aptosBridge.bridge.setDstNativeAmount('0.05')
  //     window.aptosBridge.config.setTokens(['CAKE'])
  //     window.aptosBridge.config.setWallets(['MetaMask', 'CoinBase', 'Petra', 'Martian', 'Pontem', 'Fewcha'])
  //     setShow(true)
  //   })
  // }, [])

  return (
    <Page>
      <Script crossOrigin="anonymous" src={LAYER_ZERO_JS.src} integrity={LAYER_ZERO_JS.integrity} />
      <link rel="stylesheet" href="https://unpkg.com/@layerzerolabs/x-pancakeswap-widget@latest/element.css" />
      {show && (
        <Box width={['100%', null, '420px']} m="auto">
          <Flex flexDirection="column" bg="backgroundAlt" borderRadius={[0, null, 24]} alignItems="center">
            <LayerZeroWidget theme={theme} />
            <Box display={['block', null, 'none']}>
              <AptosBridgeFooter isCake />
            </Box>
          </Flex>
          <Box display={['none', null, 'block']}>
            <AptosBridgeFooter isCake />
          </Box>
        </Box>
      )}
    </Page>
  )
}

export default AptosBridge
