// eslint-disable-next-line import/prefer-default-export
import tokens from '../../config/constants/tokens'
import artists from '../../config/constants/artists'
import { getAddress } from '../../utils/addressHelpers'

const tableData = [
  {
    id: 1,
    pid: 0,
    name: 'RugZombie Common',
    subtitle: 'Basic Zombie',
    path: 'images/rugZombie/BasicZombie.gif',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: '',
    artist: artists.RugZombie,
    stakingToken: getAddress(tokens.undead.address),
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: '0',
      amount: '0',
    },
    poolInfo: {},
    pendingZombie: '0',
  },
  {
    id: 2,
    pid: 1,
    name: 'VikingSwap Rare',
    subtitle: 'Viking Brains',
    path: 'images/rugZombie/VikingBrains.jpeg',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.viking,
    artist: artists.TheLeap3d,
    stakingToken: '0xf9a07BefC757E088431d4bcfD59ED40911808465',
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: '0',
      amount: '0',
    },
    poolInfo: {},
    pendingZombie: '0',
  },
  {
    id: 3,
    pid: 2,
    name: 'MonsterSlayer Rare',
    subtitle: 'ZombieSlayer',
    path: 'images/rugZombie/ZombieSlayer.gif',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.msc,
    artist: artists.ZomBaes,
    stakingToken: '0x97bDCb5FBE40437ed46a0C515b3ba708e4c85531',
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: '0',
      amount: '0',
    },
    poolInfo: {},
    pendingZombie: '0',
  },
  {
    id: 4,
    pid: 3,
    name: 'Defi100 Rare',
    subtitle: 'Zombie100',
    path: 'images/rugZombie/Defi100 Rare.gif',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.d100,
    artist: artists.ZomBaes,
    stakingToken: '0x5E017DB6Fcf25ACCbCF2B8655852eEcD7AbE42Fe',
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: '0',
      amount: '0',
    },
    poolInfo: {},
    pendingZombie: '0',
  },
  {
    id: 5,
    pid: 4,
    name: 'Fairmoon Rare',
    subtitle: 'Raremoon',
    path: 'images/rugZombie/Raremoon.jpeg',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.fairmoon,
    artist: artists.TheLeap3d,
    stakingToken: '0x083C1b0C09A8D31657D047dE1F25beceDee230FD',
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: '0',
      amount: '0',
    },
    poolInfo: {},
    pendingZombie: '0',
  },
  {
    id: 6,
    pid: 5,
    name: 'Fairmoon Uncommon',
    subtitle: 'Zombie on the Moon',
    path: 'images/rugZombie/FairmoonUncommon.mp4',
    type: 'video',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '14 days',
    rug: tokens.fairmoon,
    artist: '/',
    stakingToken: '0x23D06AA7f692C6b5A965F9e35B68e53E5A4BCb0C',
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: '0',
      amount: '0',
    },
    poolInfo: {},
    pendingZombie: '0',
  },
  {
    id: 7,
    pid: 6,
    name: 'Fairmoon Common',
    subtitle: 'Fairmoon Common',
    path: 'images/rugZombie/FairmoonCommon.mp4',
    type: 'video',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.fairmoon,
    artist: '/',
    stakingToken: '0x39726CD9Eb1ab5bC176cFF524636EC36B04601d6',
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: '0',
      amount: '0',
    },
    poolInfo: {},
    pendingZombie: '0',
  },
  {
    id: 8,
    pid: 7,
    name: 'Gorilla Yield Common',
    subtitle: 'Gorilla Yield Common',
    path: 'images/rugZombie/yApeCommon.jpeg',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.yape,
    artist: '/',
    stakingToken: '0x86547EF94D6a9EbD346296B46881f8a2430f2F2a',
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: '0',
      amount: '0',
    },
    poolInfo: {},
    pendingZombie: '0',
  },
  {
    id: 9,
    pid: 8,
    name: 'Dragon Farm Finance Common',
    subtitle: 'Dragon Farm Finance Common',
    path: 'images/rugZombie/CommonDragonFarmFinance.mp4',
    type: 'video',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.dragon,
    artist: '/',
    stakingToken: '0x75C6c05fD3854c133FE39668F66440289890d690',
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: '0',
      amount: '0',
    },
    poolInfo: {},
    pendingZombie: '0',
  },
  {
    id: 10,
    pid: 9,
    name: 'yPanda Common',
    subtitle: 'yPanda Common',
    path: 'images/rugZombie/yPandaCommon.jpeg',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.ypanda,
    artist: '/',
    stakingToken: '0x75C6c05fD3854c133FE39668F66440289890d690',
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: '0',
      amount: '0',
    },
    poolInfo: {},
    pendingZombie: '0',
    stakingTokenStaked: '0',
  },
]

export default tableData
