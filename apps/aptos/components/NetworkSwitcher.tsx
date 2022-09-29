import { useNetwork } from '@pancakeswap/awgmi'
import { useIsMounted } from '@pancakeswap/hooks'
import { useTranslation } from '@pancakeswap/localization'
import { Box, Text, UserMenu, UserMenuDivider, UserMenuItem } from '@pancakeswap/uikit'
import { bsc, mainnet } from '@pancakeswap/wagmi/chains'
import { APEX_DOMAIN } from 'config'
import Image from 'next/future/image'

const NetworkSelect = () => {
  const { t } = useTranslation()

  return (
    <>
      <Box px="16px" py="8px">
        <Text color="textSubtle">{t('Select a Network')}</Text>
      </Box>
      <UserMenuDivider />
      {[bsc, mainnet].map((chain) => (
        <UserMenuItem
          key={chain.id}
          style={{ justifyContent: 'flex-start' }}
          as="a"
          target="_blank"
          href={`${APEX_DOMAIN}?chainId=${chain.id}`}
        >
          <Image
            src={`${APEX_DOMAIN}/images/chains/${chain.id}.png`}
            width={24}
            height={24}
            unoptimized
            alt={`chain-${chain.id}`}
          />
          <Text color="text" pl="12px">
            {chain.name}
          </Text>
        </UserMenuItem>
      ))}
    </>
  )
}

export const NetworkSwitcher = () => {
  const network = useNetwork()

  const isMounted = useIsMounted()

  return (
    <UserMenu
      mr="8px"
      variant="default"
      avatarSrc="/images/apt.png"
      placement="bottom"
      text={
        <>
          <Box display={['none', null, null, null, null, 'block']}>
            Aptos{isMounted && network.chain?.testnet && network.chain?.name ? ` ${network.chain?.name}` : ''}
          </Box>
          <Box display={['block', null, null, null, null, 'none']}>APT</Box>
        </>
      }
    >
      {() => <NetworkSelect />}
    </UserMenu>
  )
}
