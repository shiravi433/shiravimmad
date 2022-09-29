export type BlockExplorer = { name: string; url: string }

export type Chain = {
  /** ID in number form */
  id: number
  /** Human-readable name */
  name: string
  /** Internal network name */
  network: string
  /** Collection of Restful endpoints */
  restUrls: {
    [key: string]: string
    default: string
  }
  /** Collection of block explorers */
  blockExplorers?: {
    [key: string]: BlockExplorer
    default: BlockExplorer
  }
  /** Flag for test networks */
  testnet?: boolean
}

export const devnet: Chain = {
  id: 32,
  name: 'Devnet',
  network: 'devnet',
  restUrls: {
    default: 'https://fullnode.devnet.aptoslabs.com/v1',
  },
  blockExplorers: {
    default: {
      name: 'Aptos Explorer',
      url: 'https://explorer.aptoslabs.com',
    },
  },
  testnet: true,
}

export const testnet: Chain = {
  id: 2,
  name: 'Testnet',
  network: 'testnet',
  restUrls: {
    default: 'https://testnet.aptoslabs.com/v1',
  },
  blockExplorers: {
    default: {
      name: 'Aptos Explorer',
      url: 'https://explorer.aptoslabs.com',
    },
  },
  testnet: true,
}

export const defaultChains = [devnet, testnet]

export const defaultChain = devnet
