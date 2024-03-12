import { arbitrumTokens } from '@pancakeswap/tokens'
import { FeeAmount } from '@pancakeswap/v3-sdk'
import { Strategy, VaultConfig } from '../../types'
import { MANAGER } from '../managers'

export const vaults: VaultConfig[] = [
  {
    id: 20,
    idByManager: 20,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x968EAf5e7cf26419129f9aEC8B28BC6BfE83057F',
    address: '0x968EAf5e7cf26419129f9aEC8B28BC6BfE83057F',
    vaultAddress: '0x7B89B8c243bd56301B0B749a16B071A8285203c8',
    adapterAddress: '0xFDb02b3dEABb11b7F6377e264b3D041dD1BcfD82',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.mgp,
    earningToken: arbitrumTokens.cake,
    feeTier: FeeAmount.MEDIUM,
    strategy: Strategy.ALO,
    manager: MANAGER.TEAHOUSE,
    isSingleDepositToken: false,
    allowDepositToken0: true,
    allowDepositToken1: true,
    managerInfoUrl: 'https://www.defiedge.io/',
    strategyInfoUrl: 'https://docs.defiedge.io/category/strategy-manager',
    learnMoreAboutUrl: 'https://docs.defiedge.io/category/strategy-manager',
  },
  {
    id: 19,
    idByManager: 19,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x44638Dec2dC4E7A4540577DF2bfb74ad8A3C548f',
    address: '0x44638Dec2dC4E7A4540577DF2bfb74ad8A3C548f',
    vaultAddress: '0xAC98137c3dbE929aE354dDCF50E73Bf59d88dB00',
    adapterAddress: '0x9cD975352096ba4183b3d9Fa1f447fB6093CC930',
    currencyA: arbitrumTokens.cake,
    currencyB: arbitrumTokens.weth,
    earningToken: arbitrumTokens.cake,
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
    id: 18,
    idByManager: 18,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x0Cb74917B42B97B3359374d65Ae397a83B22e9D8',
    address: '0x0Cb74917B42B97B3359374d65Ae397a83B22e9D8',
    adapterAddress: '0xa33B740e0c62733836FC4B673E0C78b8a054Cca1',
    vaultAddress: '0x2167812429122441eaF7ADC50Ac96BCA1A39aA7D',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.link,
    earningToken: arbitrumTokens.cake,
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
    id: 17,
    idByManager: 17,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x7E20FFb935f748AbF9CBF09ca561f5b4bC901675',
    address: '0x7E20FFb935f748AbF9CBF09ca561f5b4bC901675',
    adapterAddress: '0x378836AD325dF4B0A0EFFF0A7974C2030626CD11',
    vaultAddress: '0xee58dC42bC4E80331553CF6c4eb11efA54fFecDB',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.gmx,
    earningToken: arbitrumTokens.cake,
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
    id: 16,
    idByManager: 16,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x014ede77F875EF0E4A028218f7741bC6fd7159F1',
    address: '0x014ede77F875EF0E4A028218f7741bC6fd7159F1',
    adapterAddress: '0x71d031a236Ffe30E2dED841A71019De5a68589F1',
    vaultAddress: '0xD6d29209C256aD605cAB2a0aa3A7e68BA25bD9E6',
    currencyA: arbitrumTokens.rdnt,
    currencyB: arbitrumTokens.weth,
    earningToken: arbitrumTokens.cake,
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
    id: 15,
    idByManager: 15,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x969C57f0dc7A6cD4203BDE2dE134b86cEE889d7a',
    address: '0x969C57f0dc7A6cD4203BDE2dE134b86cEE889d7a',
    adapterAddress: '0xA068A82D760143ea1bCA4D678CD989de03F48AB4',
    vaultAddress: '0xdf3BB5c34B2502c2556f70CaF2B215477b4aCC93',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.usdc,
    earningToken: arbitrumTokens.cake,
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
    id: 14,
    idByManager: 14,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x9c113463703b549c8480F443f698F26E0A40B622',
    address: '0x9c113463703b549c8480F443f698F26E0A40B622',
    adapterAddress: '0x51d03F71daDb32866d422038F94bF5e9519ac21f',
    vaultAddress: '0xea42d38AfeAdbA743123e11f012FC017A7534e68',
    currencyA: arbitrumTokens.arb,
    currencyB: arbitrumTokens.usdc,
    earningToken: arbitrumTokens.cake,
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
    id: 13,
    idByManager: 13,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x064D09EF7C3487d6182c9011ee9f847A4B40D4E0',
    address: '0x064D09EF7C3487d6182c9011ee9f847A4B40D4E0',
    adapterAddress: '0x1EC0424a196240F3b0Fa88E87808Dc8addc01C54',
    vaultAddress: '0xC6BACE1E2976a7448803F0D686c1dCC4BA8319d9',
    currencyA: arbitrumTokens.wbtc,
    currencyB: arbitrumTokens.weth,
    earningToken: arbitrumTokens.cake,
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
    id: 12,
    idByManager: 12,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x5C73bBe2E997D4341bfbA8dFEc549e6a96b14b57',
    address: '0x5C73bBe2E997D4341bfbA8dFEc549e6a96b14b57',
    adapterAddress: '0x849c406e3159f70918103FA00458c42c3f1F77ec',
    vaultAddress: '0xDce0e85Ed514626d698619Be2135B0f3E16E8E06',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.arb,
    earningToken: arbitrumTokens.cake,
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
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0xD4d14832b30980B4d0C1a93af49e93977eb14a9a',
    address: '0xD4d14832b30980B4d0C1a93af49e93977eb14a9a',
    adapterAddress: '0x9329dfA266DA90Ffa438DC46260099B54998A9c0',
    vaultAddress: '0xa20bc2656e1b310b6CA711c012D7a36e15712Cda',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.usdt,
    earningToken: arbitrumTokens.cake,
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
    id: 10,
    idByManager: 10,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x57398083eFcd4E530E64F3fBC506d2039D684F24',
    address: '0x57398083eFcd4E530E64F3fBC506d2039D684F24',
    vaultAddress: '0xAC98137c3dbE929aE354dDCF50E73Bf59d88dB00',
    adapterAddress: '0xea5404B85994692c3797b8D8A8470CCC3693ccF1',
    currencyA: arbitrumTokens.cake,
    currencyB: arbitrumTokens.weth,
    earningToken: arbitrumTokens.arb,
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
    id: 9,
    idByManager: 9,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x280A1795A8Ce911494282245b1011c1935834a17',
    address: '0x280A1795A8Ce911494282245b1011c1935834a17',
    adapterAddress: '0xbE59eDf2638d9145b0AAE5960Da42b307188F941',
    vaultAddress: '0x2167812429122441eaF7ADC50Ac96BCA1A39aA7D',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.link,
    earningToken: arbitrumTokens.arb,
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
    id: 8,
    idByManager: 8,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x60F7dB3d72bBA74Ea57C662927643188b3b349f2',
    address: '0x60F7dB3d72bBA74Ea57C662927643188b3b349f2',
    adapterAddress: '0x2E24fc25E15e2E3fD226671807e3c1fa413E151b',
    vaultAddress: '0xee58dC42bC4E80331553CF6c4eb11efA54fFecDB',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.gmx,
    earningToken: arbitrumTokens.arb,
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
    id: 7,
    idByManager: 7,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0xcb64d18C697893f15C858B6F6b9FD2fc856219bf',
    address: '0xcb64d18C697893f15C858B6F6b9FD2fc856219bf',
    adapterAddress: '0x5333a432bEE8A29033E5c250CAeD9fdC1Bc67fb4',
    vaultAddress: '0xD6d29209C256aD605cAB2a0aa3A7e68BA25bD9E6',
    currencyA: arbitrumTokens.rdnt,
    currencyB: arbitrumTokens.weth,
    earningToken: arbitrumTokens.arb,
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
    id: 6,
    idByManager: 6,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x8767a18F3bF0A53464e970B2166d2C9b1c6Db992',
    address: '0x8767a18F3bF0A53464e970B2166d2C9b1c6Db992',
    adapterAddress: '0x97F7dc95E12DfBcFd0c8aF1460046595be03E299',
    vaultAddress: '0xdf3BB5c34B2502c2556f70CaF2B215477b4aCC93',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.usdc,
    earningToken: arbitrumTokens.arb,
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
    id: 5,
    idByManager: 5,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x735394aF11b0eA4123fA420C8A3f01949B07cd14',
    address: '0x735394aF11b0eA4123fA420C8A3f01949B07cd14',
    adapterAddress: '0x724d7dbC6e203a73F01EB07B9E5eeCD67D7c52FB',
    vaultAddress: '0xea42d38AfeAdbA743123e11f012FC017A7534e68',
    currencyA: arbitrumTokens.arb,
    currencyB: arbitrumTokens.usdc,
    earningToken: arbitrumTokens.arb,
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
    id: 4,
    idByManager: 4,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x82C6Ea44cEb07503AA5e97339Fc1C5A5BA4B9D7F',
    address: '0x82C6Ea44cEb07503AA5e97339Fc1C5A5BA4B9D7F',
    adapterAddress: '0x613837BDa0e508E6f044Ca380ef83BDC15a861A1',
    vaultAddress: '0xC6BACE1E2976a7448803F0D686c1dCC4BA8319d9',
    currencyA: arbitrumTokens.wbtc,
    currencyB: arbitrumTokens.weth,
    earningToken: arbitrumTokens.arb,
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
    id: 3,
    idByManager: 3,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0xdE9D1E335402808Eb49de315C89065c69fc5514E',
    address: '0xdE9D1E335402808Eb49de315C89065c69fc5514E',
    adapterAddress: '0xf8454a7df271e851ee4DD4CF4950809D166a9721',
    vaultAddress: '0xDce0e85Ed514626d698619Be2135B0f3E16E8E06',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.arb,
    earningToken: arbitrumTokens.arb,
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
    id: 2,
    idByManager: 2,
    name: 'DEFIEDGE',
    bCakeWrapperAddress: '0x156EB371611d4AFdDee56972D7fB8fd6061a13f7',
    address: '0x156EB371611d4AFdDee56972D7fB8fd6061a13f7',
    adapterAddress: '0x677e65f76537AaCF84AB6F177037504b5662D89E',
    vaultAddress: '0xa20bc2656e1b310b6CA711c012D7a36e15712Cda',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.usdt,
    earningToken: arbitrumTokens.arb,
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
    id: 1,
    idByManager: 1,
    name: 'DEFIEDGE',
    address: '0x4fa0c6FC2d0d7b6cDa4215Ff09e8ed444F87dDB3',
    adapterAddress: '0xaCAbb974b3c97f8F521634AcaC6ce1D9A1557BFb',
    vaultAddress: '0xDce0e85Ed514626d698619Be2135B0f3E16E8E06',
    currencyA: arbitrumTokens.weth,
    currencyB: arbitrumTokens.arb,
    earningToken: arbitrumTokens.cake,
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
]
