import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.KiwanoSwap.io/contact-us',
        isHighlighted: true,
      },
      {
        label: t('Brand'),
        href: 'https://docs.KiwanoSwap.io/brand',
      },
      {
        label: t('Blog'),
        href: 'https://medium.com/pancakeswap',
      },
      {
        label: t('Community'),
        href: 'https://docs.KiwanoSwap.io/contact-us/telegram',
      },
      {
        label: t('WANO token'),
        href: 'https://docs.KiwanoSwap.io/tokenomics/WANO',
      },
      {
        label: '—',
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Customer Support'),
        href: 'https://docs.KiwanoSwap.io/contact-us/customer-support',
      },
      {
        label: t('Troubleshooting'),
        href: 'https://docs.KiwanoSwap.io/help/troubleshooting',
      },
      {
        label: t('Guides'),
        href: 'https://docs.KiwanoSwap.io/get-started',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/pancakeswap',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.KiwanoSwap.io',
      },
    ],
  },
]
