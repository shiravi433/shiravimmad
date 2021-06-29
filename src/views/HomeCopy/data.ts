// eslint-disable-next-line import/prefer-default-export
import tokens from '../../config/constants/tokens'
import artists from '../../config/constants/artists'

const tableData = [
  {
    id: 1,
    pid: 0,
    name: 'RugZombie Common',
    path: 'images/rugZombie/BasicZombie.gif',
    type: 'image',
    withdrawalCooldown: '2 days',
    nftRevivalTime: '30 days',
    rug: '',
    artist: artists.RugZombie,
    stakingToken: undefined,
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: "0",
      amount: '0',
    },
    poolInfo: {},
pendingZombie: '0'
  },
  {
    id: 2,
    pid: 1,
    name: 'VikingSwap Common',
    path: 'images/rugZombie/VikingBrains.jpeg',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.viking,
    artist: artists.TheLeap3d,
    stakingToken: undefined,
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: "0",
      amount: '0',
    },
    poolInfo: {},
pendingZombie: '0'
  },
  {
    id: 3,
    pid: 2,
    name: 'MonsterSlayer Rare',
    path: 'images/rugZombie/ZombieSlayer.gif',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.msc,
    artist: artists.ZomBaes,
    stakingToken: undefined,
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: "0",
      amount: '0',
    },
    poolInfo: {},
pendingZombie: '0'
  },
  {
    id: 4,
    pid: 3,
    name: 'Fairmoon Rare',
    path: 'images/rugZombie/Raremoon.jpeg',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.fairmoon,
    artist: artists.TheLeap3d,
    stakingToken: undefined,
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: "0",
      amount: '0',
    },
    poolInfo: {},
pendingZombie: '0'
  },
  {
    id: 5,
    pid: 4,
    name: 'Fairmoon Uncommon',
    path: 'images/rugZombie/FairmoonUncommon.mp4',
    type: 'video',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '14 days',
    rug: tokens.fairmoon,
    artist: '/',
    stakingToken: undefined,
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: "0",
      amount: '0',
    },
    poolInfo: {},
pendingZombie: '0'
  },
  {
    id: 6,
    pid: 5,
    name: 'Fairmoon Common',
    path: 'images/rugZombie/FairmoonCommon.mp4',
    type: 'video',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.fairmoon,
    artist: '/',
    stakingToken: undefined,
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: "0",
      amount: '0',
    },
    poolInfo: {},
pendingZombie: '0'
  },
  {
    id: 7,
    pid: 6,
    name: 'Gorilla Yield Common',
    path: 'images/rugZombie/yApeCommon.jpeg',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.yape,
    artist: '/',
    stakingToken: undefined,
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: "0",
      amount: '0',
    },
    poolInfo: {},
pendingZombie: '0'
  },
  {
    id: 8,
    pid: 7,
    name: 'Dragon Farm Finance Common',
    path: 'images/rugZombie/CommonDragonFarmFinance.mp4',
    type: 'video',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.dragon,
    artist: '/',
    stakingToken: undefined,
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: "0",
      amount: '0',
    },
    poolInfo: {},
pendingZombie: '0'
  },
  {
    id: 9,
    pid: 8,
    name: 'Yield Panda Common',
    path: 'images/rugZombie/yPandaCommon.jpeg',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.ypanda,
    artist: '/',
    stakingToken: undefined,
    result: {
      paidUnlockFee: false,
      rugDeposited: 0,
      tokenWithdrawalDate: "0",
      amount: '0',
    },
    poolInfo: {},
pendingZombie: '0'
  },
]

export default tableData
