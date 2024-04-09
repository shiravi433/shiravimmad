import { bscTokens } from '@pancakeswap/tokens'
import { FeeAmount } from '@pancakeswap/v3-sdk'
import { Strategy, VaultConfig } from '../../types'
import { MANAGER } from '../managers'

export const vaults: VaultConfig[] = [
  {
    id: 19,
    idByManager: 19,
    name: 'BRIL',
    bCakeWrapperAddress: '0xBc30771EACE84276A136D48bD353D866186A0e9c',
    address: '0xBc30771EACE84276A136D48bD353D866186A0e9c',
    adapterAddress: '0x4Fe32015C6171eba616A6944F342716E41EDc1Ba',
    vaultAddress: '0x6C158eDF4ED9319ff08022b1dbb1CC56308Ac939',
    currencyA: bscTokens.wbnb,
    currencyB: bscTokens.ordi,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.MEDIUM,
    strategy: Strategy.YIELD_IQ,
    manager: MANAGER.BRIL,
    isSingleDepositToken: true,
    allowDepositToken0: false,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.bril.finance/',
    strategyInfoUrl: 'https://docs.bril.finance/yield-iq/overview',
    learnMoreAboutUrl: 'https://docs.bril.finance/bril-finance/introduction',
    priceFromV3FarmPid: 117,
  },
  {
    id: 18,
    idByManager: 18,
    name: 'BRIL',
    bCakeWrapperAddress: '0x13f8b6e57C2707A106Cf04D5a68B922e4972DF8d',
    address: '0x13f8b6e57C2707A106Cf04D5a68B922e4972DF8d',
    adapterAddress: '0x0F61B77A722B0D9044d09d7f6d0D62b00a7CA6aC',
    vaultAddress: '0xB6C1A5994f799FaC413F1DeC2819FE9a2e22c1D4',
    currencyA: bscTokens.sats,
    currencyB: bscTokens.wbnb,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.HIGH,
    strategy: Strategy.YIELD_IQ,
    manager: MANAGER.BRIL,
    isSingleDepositToken: true,
    allowDepositToken0: true,
    allowDepositToken1: false,
    managerInfoUrl: 'https://www.bril.finance/',
    strategyInfoUrl: 'https://docs.bril.finance/yield-iq/overview',
    learnMoreAboutUrl: 'https://docs.bril.finance/bril-finance/introduction',
  },
  {
    id: 17,
    idByManager: 17,
    name: 'BRIL',
    bCakeWrapperAddress: '0xD9ca39cBE08E9ddE23d12670e472A2C2162239A3',
    address: '0xD9ca39cBE08E9ddE23d12670e472A2C2162239A3',
    adapterAddress: '0xebeBF63794caf8fcc7651c62E98AD7977ec22683',
    vaultAddress: '0xB1B9e5e11f3561bf87F551DDd47efD2F3B8236fc',
    currencyA: bscTokens.mubi,
    currencyB: bscTokens.wbnb,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.MEDIUM,
    strategy: Strategy.YIELD_IQ,
    manager: MANAGER.BRIL,
    isSingleDepositToken: true,
    allowDepositToken0: true,
    allowDepositToken1: false,
    managerInfoUrl: 'https://www.bril.finance/',
    strategyInfoUrl: 'https://docs.bril.finance/yield-iq/overview',
    learnMoreAboutUrl: 'https://docs.bril.finance/bril-finance/introduction',
    priceFromV3FarmPid: 118,
  },
  {
    id: 16,
    idByManager: 16,
    name: 'ALPACA',
    bCakeWrapperAddress: '0x0c8F9C4b0dF31D9E091f0F1Fc8222cFf0F34C32e',
    address: '0x0c8F9C4b0dF31D9E091f0F1Fc8222cFf0F34C32e',
    adapterAddress: '0xE7Dc421e290f9B4fA287238781D162FB90b5587c',
    vaultAddress: '0xb08eE41e88A2820cd572B4f2DFc459549790F2D7',
    currencyA: bscTokens.usdt,
    currencyB: bscTokens.wbnb,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.LOW,
    strategy: Strategy.SAVINGS,
    manager: MANAGER.ALPACA,
    isSingleDepositToken: true,
    allowDepositToken0: false,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.alpacafinance.org/',
    strategyInfoUrl:
      'https://docs.alpacafinance.org/automated-vault/introduction-to-automated-vaults/savings-vault-strategy',
    learnMoreAboutUrl: 'https://docs.alpacafinance.org/leveraged-yield-farming/strategies/pancakeswap-farms',
    priceFromV3FarmPid: 5,
    minDepositUSD: 50,
  },
  {
    id: 15,
    idByManager: 15,
    name: 'ALPACA',
    bCakeWrapperAddress: '0x98385EBAC7055a569b76C66Dd559055263Bc88da',
    address: '0x98385EBAC7055a569b76C66Dd559055263Bc88da',
    adapterAddress: '0x778E55EeAA3cC7F590272aC4E173d43012271bad',
    vaultAddress: '0xdEBe96323D54d4D58F4bB526e58627Fb0651Bb00',
    currencyA: bscTokens.eth,
    currencyB: bscTokens.btcb,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.MEDIUM,
    strategy: Strategy.SAVINGS,
    manager: MANAGER.ALPACA,
    isSingleDepositToken: true,
    allowDepositToken0: false,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.alpacafinance.org/',
    strategyInfoUrl:
      'https://docs.alpacafinance.org/automated-vault/introduction-to-automated-vaults/savings-vault-strategy',
    learnMoreAboutUrl: 'https://docs.alpacafinance.org/leveraged-yield-farming/strategies/pancakeswap-farms',
    priceFromV3FarmPid: 8,
    minDepositUSD: 50,
  },
  {
    id: 14,
    idByManager: 14,
    name: 'BRIL',
    address: '0xf299115CdA681475DabFF3883939F91F5Cc40352',
    adapterAddress: '0x38bcc39F1fcb218F17c1C88651891F73681d11C1',
    vaultAddress: '0x170b807502d1b6c18123149AF641d47fC061F6bb',
    currencyA: bscTokens.aioz,
    currencyB: bscTokens.wbnb,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.MEDIUM,
    strategy: Strategy.YIELD_IQ,
    manager: MANAGER.BRIL,
    isSingleDepositToken: true,
    allowDepositToken0: true,
    allowDepositToken1: false,
    managerInfoUrl: 'https://www.bril.finance/',
    strategyInfoUrl: 'https://docs.bril.finance/yield-iq/overview',
    learnMoreAboutUrl: 'https://docs.bril.finance/bril-finance/introduction',
  },
  {
    id: 12,
    idByManager: 12,
    name: 'DEFIEDGE',
    address: '0xf27fbD1c916672d6057416BA186FDde45fa980D7',
    adapterAddress: '0xD9fA26BaB321763b1e77bCc0e18EDF7Ee0081962',
    vaultAddress: '0x1f36E4aEdA53F7fac687a8D3Ee97D6A4909DE512',
    currencyA: bscTokens.cake,
    currencyB: bscTokens.wbnb,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.MEDIUM,
    strategy: Strategy.ALO,
    manager: MANAGER.DEFIEDGE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.defiedge.io/',
    strategyInfoUrl: 'https://docs.defiedge.io/category/strategy-manager',
    learnMoreAboutUrl: 'https://docs.defiedge.io/category/strategy-manager',
  },
  {
    id: 13,
    idByManager: 7,
    name: 'DEFIEDGE',
    address: '0x72A326D1e71Ff5c52849e3F27F7CFdA01eB27Fe7',
    adapterAddress: '0xeC0cc9D2dfBc1Ba36B2843A8BCB3aF7dd4FdB891',
    vaultAddress: '0x27c42da0cCC1b394426858667d7ec9f0b0373187',
    currencyA: bscTokens.usdt,
    currencyB: bscTokens.wbnb,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.LOW,
    strategy: Strategy.ALO,
    manager: MANAGER.DEFIEDGE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.defiedge.io/',
    strategyInfoUrl: 'https://docs.defiedge.io/category/strategy-manager',
    learnMoreAboutUrl: 'https://docs.defiedge.io/category/strategy-manager',
  },
  {
    id: 11,
    idByManager: 11,
    name: 'BRIL',
    address: '0x1De20A5825ADFc665F634A2A7A3b1c9e3D0d2987',
    adapterAddress: '0xD2EE2ed27963E91c0860AbAEfd0590A546342c83',
    vaultAddress: '0x57424fF60D0a23cB13CAf995c39E41FDB7c4fc1f',
    currencyA: bscTokens.eth,
    currencyB: bscTokens.usdc,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.LOW,
    strategy: Strategy.YIELD_IQ,
    manager: MANAGER.BRIL,
    isSingleDepositToken: true,
    allowDepositToken0: false,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.bril.finance/',
    strategyInfoUrl: 'https://docs.bril.finance/yield-iq/overview',
    learnMoreAboutUrl: 'https://docs.bril.finance/bril-finance/introduction',
  },
  {
    id: 1,
    idByManager: 1,
    name: 'BRIL',
    address: '0xF8C4d24Af47cBD87E3C8Cc368fcd7e3cd2a13083',
    adapterAddress: '0x6F34909c663e6E6dA32b73f0aa5aD7bdABf21a63',
    vaultAddress: '0x0Def612e7a7b51ca7Ee38f7905dA809BD3491268',
    currencyA: bscTokens.cake,
    currencyB: bscTokens.usdt,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.MEDIUM,
    strategy: Strategy.YIELD_IQ,
    manager: MANAGER.BRIL,
    isSingleDepositToken: true,
    allowDepositToken0: false,
    allowDepositToken1: true,
    priceFromV3FarmPid: 3,
    managerInfoUrl: 'https://www.bril.finance/',
    strategyInfoUrl: 'https://docs.bril.finance/yield-iq/overview',
    learnMoreAboutUrl: 'https://docs.bril.finance/bril-finance/introduction',
  },
  {
    id: 2,
    idByManager: 2,
    name: 'BRIL',
    address: '0x799Ea58D15429fa7C42cc211e2181FD4EF54ec37',
    adapterAddress: '0x443454bd4916E84EB3de7b50F4D7f6B384E72457',
    vaultAddress: '0x553A31Bb23218a10FF1fFE6492f0D3C71fb88D24',
    currencyA: bscTokens.usdt,
    currencyB: bscTokens.wbnb,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.LOW,
    strategy: Strategy.YIELD_IQ,
    manager: MANAGER.BRIL,
    isSingleDepositToken: true,
    allowDepositToken0: true,
    allowDepositToken1: false,
    managerInfoUrl: 'https://www.bril.finance/',
    strategyInfoUrl: 'https://docs.bril.finance/yield-iq/overview',
    learnMoreAboutUrl: 'https://docs.bril.finance/bril-finance/introduction',
    priceFromV3FarmPid: 5,
  },
  {
    id: 3,
    idByManager: 3,
    name: 'BRIL',
    address: '0xCd03B3757BC956e312F639dA1661d18DB7e72ED7',
    adapterAddress: '0x2cFE4c59286D06630eA9f6Da8b2887BaC1AD9c4C',
    vaultAddress: '0x8f22d7B80446F1dc4C5eb47F2038e17CA0306e0D',
    currencyA: bscTokens.cake,
    currencyB: bscTokens.wbnb,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.MEDIUM,
    strategy: Strategy.YIELD_IQ,
    manager: MANAGER.BRIL,
    isSingleDepositToken: true,
    allowDepositToken0: false,
    allowDepositToken1: true,
    priceFromV3FarmPid: 1,
    managerInfoUrl: 'https://www.bril.finance/',
    strategyInfoUrl: 'https://docs.bril.finance/yield-iq/overview',
    learnMoreAboutUrl: 'https://docs.bril.finance/bril-finance/introduction',
  },
  {
    id: 4,
    idByManager: 4,
    name: 'BRIL',
    address: '0x2044bCaaDa8370b4ee8Ad47DaAD290B80878D068',
    adapterAddress: '0x259C5a1f3482C3988c546745A876E3f1017533df',
    vaultAddress: '0x585374f0502B8E2814e5A3eB16B06DB964610b77',
    currencyA: bscTokens.usdt,
    currencyB: bscTokens.btcb,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.LOW,
    strategy: Strategy.YIELD_IQ,
    manager: MANAGER.BRIL,
    isSingleDepositToken: true,
    allowDepositToken0: false,
    allowDepositToken1: true,
    priceFromV3FarmPid: 7,
    managerInfoUrl: 'https://www.bril.finance/',
    strategyInfoUrl: 'https://docs.bril.finance/yield-iq/overview',
    learnMoreAboutUrl: 'https://docs.bril.finance/bril-finance/introduction',
  },
  {
    id: 5,
    idByManager: 5,
    name: 'BRIL',
    address: '0x819c1C2FeF70Eb45919Ce7c7936cC0da95E30A33',
    adapterAddress: '0x0CD23a6DcDF86535dF5b160E0adc0C7C46f80BaC',
    vaultAddress: '0x4005A85F68f307cD97e23F7710162E1eBE6139Ac',
    currencyA: bscTokens.cake,
    currencyB: bscTokens.btcb,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.MEDIUM,
    strategy: Strategy.YIELD_IQ,
    manager: MANAGER.BRIL,
    isSingleDepositToken: true,
    allowDepositToken0: false,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.bril.finance/',
    strategyInfoUrl: 'https://docs.bril.finance/yield-iq/overview',
    learnMoreAboutUrl: 'https://docs.bril.finance/bril-finance/introduction',
  },
  {
    id: 6,
    idByManager: 6,
    name: 'BRIL',
    address: '0x7216B5ae51a459Add75Dc3d0f1B030996da82aE0',
    adapterAddress: '0xdE4810cF706F2df6a4Ab063D7008a575Fb2B6c4C',
    vaultAddress: '0x17A39482e7f42ebB0f65d2978dcB1423E399D07a',
    currencyA: bscTokens.cake,
    currencyB: bscTokens.eth,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.MEDIUM,
    strategy: Strategy.YIELD_IQ,
    manager: MANAGER.BRIL,
    isSingleDepositToken: true,
    allowDepositToken0: false,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.bril.finance/',
    strategyInfoUrl: 'https://docs.bril.finance/yield-iq/overview',
    learnMoreAboutUrl: 'https://docs.bril.finance/bril-finance/introduction',
  },
  {
    id: 7,
    idByManager: 7,
    name: 'RANGE',
    address: '0x00da85bD6C4e417f9EfC07807d6a0381045B037C',
    adapterAddress: '0x81dA9a3bE0490E23e0D5d31A0fC542405E45d7Ff',
    vaultAddress: '0xB99F1Ce0f1C95422913FAF5b1ea980BbC580c14a',
    currencyA: bscTokens.usdt,
    currencyB: bscTokens.wbnb,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.LOW,
    strategy: Strategy.PASSIVE,
    manager: MANAGER.RANGE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.rangeprotocol.com/',
    strategyInfoUrl: 'https://range-protocol.gitbook.io/range-protocol/amm-vaults/strategy-details',
    learnMoreAboutUrl: 'https://range-protocol.gitbook.io/range-protocol/amm-vaults/strategy-details',
  },
  {
    id: 8,
    idByManager: 8,
    name: 'RANGE',
    address: '0xA43f877b66BBaaBE41eB1E538549F2fA45aceBD4',
    adapterAddress: '0x2eF089d192E4b48544049900A22472cFDB384898',
    vaultAddress: '0xfCCa9B42A366d9493E7c0a7eC4aD96E1B4204dfd',
    currencyA: bscTokens.usdt,
    currencyB: bscTokens.wbnb,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.LOW,
    strategy: Strategy.ACTIVE,
    manager: MANAGER.RANGE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.rangeprotocol.com/',
    strategyInfoUrl: 'https://range-protocol.gitbook.io/range-protocol/amm-vaults/strategy-details',
    learnMoreAboutUrl: 'https://range-protocol.gitbook.io/range-protocol/amm-vaults/strategy-details',
  },
  {
    id: 9,
    idByManager: 9,
    name: 'RANGE',
    address: '0xe521f04d91721ba3F91E6E8E4d3cE16A2CaA8b3e',
    adapterAddress: '0x517C545BB754164cE1b416aA512cA80c72092Ae3',
    vaultAddress: '0xFEB0819A3d00EACf1D8F593D2538C33d34b76274',
    currencyA: bscTokens.usdt,
    currencyB: bscTokens.usdc,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.LOWEST,
    strategy: Strategy.PEGGED,
    manager: MANAGER.RANGE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.rangeprotocol.com/',
    strategyInfoUrl: 'https://range-protocol.gitbook.io/range-protocol/amm-vaults/strategy-details',
    learnMoreAboutUrl: 'https://range-protocol.gitbook.io/range-protocol/amm-vaults/strategy-details',
  },
  {
    id: 10,
    idByManager: 10,
    name: 'RANGE',
    address: '0x88F98992D95BF894B99fE7d47f58bDbF6da394f8',
    adapterAddress: '0x57260da74fabcD3e7aB93F6edf0D898d1648f919',
    vaultAddress: '0x5db61A5f05580Cf620a9d0f9266E7432811DC309',
    currencyA: bscTokens.cake,
    currencyB: bscTokens.wbnb,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.MEDIUM,
    strategy: Strategy.PASSIVE,
    manager: MANAGER.RANGE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.rangeprotocol.com/',
    strategyInfoUrl: 'https://range-protocol.gitbook.io/range-protocol/amm-vaults/strategy-details',
    learnMoreAboutUrl: 'https://range-protocol.gitbook.io/range-protocol/amm-vaults/strategy-details',
  },
]
