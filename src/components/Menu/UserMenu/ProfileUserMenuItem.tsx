import styled from 'styled-components'
import NextLink from 'next/link'
import { Flex, Skeleton, UserMenuItem } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useTranslation } from 'contexts/Localization'
import { nftsBaseUrl } from 'views/Nft/market/constants'

interface ProfileUserMenuItemProps {
  isLoading: boolean
  hasProfile: boolean
  disabled: boolean
}

const Dot = styled.div`
  background-color: ${({ theme }) => theme.colors.failure};
  border-radius: 50%;
  height: 8px;
  width: 8px;
`

const ProfileUserMenuItem: React.FC<ProfileUserMenuItemProps> = ({ isLoading, hasProfile, disabled }) => {
  const { account } = useWeb3React()

  const { t } = useTranslation()

  if (isLoading) {
    return (
      <UserMenuItem>
        <Skeleton height="24px" width="35%" />
      </UserMenuItem>
    )
  }

  if (!hasProfile) {
    return (
      <NextLink href="/create-profile" passHref>
        <UserMenuItem as="a" disabled={disabled}>
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            {t('Make a Profile')}
            <Dot />
          </Flex>
        </UserMenuItem>
      </NextLink>
    )
  }

  return (
    <NextLink href={`${nftsBaseUrl}/profile/${account?.toLowerCase()}/achievements`} passHref>
      <UserMenuItem as="a" disabled={disabled}>
        {t('Your Profile')}
      </UserMenuItem>
    </NextLink>
  )
}

export default ProfileUserMenuItem
