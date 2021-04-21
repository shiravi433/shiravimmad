/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: '0.7.3',
  networks: {
    hardhat: {
      forking: {
        url: 'https://bsc-dataseed1.ninicoin.io',
      },
    },
  },
}
