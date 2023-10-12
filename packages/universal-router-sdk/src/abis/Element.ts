export const elementAbi = [
  {
    inputs: [
      {
        internalType: 'contract IEtherToken',
        name: 'weth',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'maker',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'taker',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'erc20Token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'erc20TokenAmount',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct INFTOrdersFeature.Fee[]',
        name: 'fees',
        type: 'tuple[]',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'erc721Token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'erc721TokenId',
        type: 'uint256',
      },
    ],
    name: 'ERC721BuyOrderFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'maker',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'taker',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'expiry',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'erc20Token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'erc20TokenAmount',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'feeData',
            type: 'bytes',
          },
        ],
        indexed: false,
        internalType: 'struct LibNFTOrder.Fee[]',
        name: 'fees',
        type: 'tuple[]',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'erc721Token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'erc721TokenId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'contract IPropertyValidator',
            name: 'propertyValidator',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'propertyData',
            type: 'bytes',
          },
        ],
        indexed: false,
        internalType: 'struct LibNFTOrder.Property[]',
        name: 'nftProperties',
        type: 'tuple[]',
      },
    ],
    name: 'ERC721BuyOrderPreSigned',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'maker',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
    ],
    name: 'ERC721OrderCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'maker',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'taker',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'erc20Token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'erc20TokenAmount',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct INFTOrdersFeature.Fee[]',
        name: 'fees',
        type: 'tuple[]',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'erc721Token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'erc721TokenId',
        type: 'uint256',
      },
    ],
    name: 'ERC721SellOrderFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'maker',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'taker',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'expiry',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'erc20Token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'erc20TokenAmount',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'feeData',
            type: 'bytes',
          },
        ],
        indexed: false,
        internalType: 'struct LibNFTOrder.Fee[]',
        name: 'fees',
        type: 'tuple[]',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'erc721Token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'erc721TokenId',
        type: 'uint256',
      },
    ],
    name: 'ERC721SellOrderPreSigned',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'maker',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newHashNonce',
        type: 'uint256',
      },
    ],
    name: 'HashNonceIncremented',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'takerData',
        type: 'bytes',
      },
    ],
    name: 'TakerDataEmitted',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTSellOrder[]',
        name: 'sellOrders',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'enum LibSignature.SignatureType',
            name: 'signatureType',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct LibSignature.Signature[]',
        name: 'signatures',
        type: 'tuple[]',
      },
      {
        internalType: 'bool',
        name: 'revertIfIncomplete',
        type: 'bool',
      },
    ],
    name: 'batchBuyERC721s',
    outputs: [
      {
        internalType: 'bool[]',
        name: 'successes',
        type: 'bool[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTSellOrder[]',
        name: 'sellOrders',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'enum LibSignature.SignatureType',
            name: 'signatureType',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct LibSignature.Signature[]',
        name: 'signatures',
        type: 'tuple[]',
      },
      {
        internalType: 'address[]',
        name: 'takers',
        type: 'address[]',
      },
      {
        internalType: 'bytes[]',
        name: 'takerDatas',
        type: 'bytes[]',
      },
      {
        internalType: 'bool',
        name: 'revertIfIncomplete',
        type: 'bool',
      },
    ],
    name: 'batchBuyERC721sEx',
    outputs: [
      {
        internalType: 'bool[]',
        name: 'successes',
        type: 'bool[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'orderNonces',
        type: 'uint256[]',
      },
    ],
    name: 'batchCancelERC721Orders',
    outputs: {},
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTSellOrder[]',
        name: 'sellOrders',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'contract IPropertyValidator',
                name: 'propertyValidator',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'propertyData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Property[]',
            name: 'nftProperties',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTBuyOrder[]',
        name: 'buyOrders',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'enum LibSignature.SignatureType',
            name: 'signatureType',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct LibSignature.Signature[]',
        name: 'sellOrderSignatures',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'enum LibSignature.SignatureType',
            name: 'signatureType',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct LibSignature.Signature[]',
        name: 'buyOrderSignatures',
        type: 'tuple[]',
      },
    ],
    name: 'batchMatchERC721Orders',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'profits',
        type: 'uint256[]',
      },
      {
        internalType: 'bool[]',
        name: 'successes',
        type: 'bool[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTSellOrder',
        name: 'sellOrder',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'enum LibSignature.SignatureType',
            name: 'signatureType',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct LibSignature.Signature',
        name: 'signature',
        type: 'tuple',
      },
    ],
    name: 'buyERC721',
    outputs: {},
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTSellOrder',
        name: 'sellOrder',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'enum LibSignature.SignatureType',
            name: 'signatureType',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct LibSignature.Signature',
        name: 'signature',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'taker',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'takerData',
        type: 'bytes',
      },
    ],
    name: 'buyERC721Ex',
    outputs: {},
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTSellOrder',
        name: 'sellOrder',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'enum LibSignature.SignatureType',
            name: 'signatureType',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct LibSignature.Signature',
        name: 'signature',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'taker',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'ethAvailable',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'takerData',
        type: 'bytes',
      },
    ],
    name: 'buyERC721ExFromProxy',
    outputs: {},
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTSellOrder',
        name: 'sellOrder',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'enum LibSignature.SignatureType',
            name: 'signatureType',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct LibSignature.Signature',
        name: 'signature',
        type: 'tuple',
      },
    ],
    name: 'buyERC721FromProxy',
    outputs: {},
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orderNonce',
        type: 'uint256',
      },
    ],
    name: 'cancelERC721Order',
    outputs: {},
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'contract IPropertyValidator',
                name: 'propertyValidator',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'propertyData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Property[]',
            name: 'nftProperties',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTBuyOrder',
        name: 'order',
        type: 'tuple',
      },
    ],
    name: 'getERC721BuyOrderHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'contract IPropertyValidator',
                name: 'propertyValidator',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'propertyData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Property[]',
            name: 'nftProperties',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTBuyOrder',
        name: 'order',
        type: 'tuple',
      },
    ],
    name: 'getERC721BuyOrderStatus',
    outputs: [
      {
        internalType: 'enum LibNFTOrder.OrderStatus',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'maker',
        type: 'address',
      },
      {
        internalType: 'uint248',
        name: 'nonceRange',
        type: 'uint248',
      },
    ],
    name: 'getERC721OrderStatusBitVector',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTSellOrder',
        name: 'order',
        type: 'tuple',
      },
    ],
    name: 'getERC721SellOrderHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTSellOrder',
        name: 'order',
        type: 'tuple',
      },
    ],
    name: 'getERC721SellOrderStatus',
    outputs: [
      {
        internalType: 'enum LibNFTOrder.OrderStatus',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'maker',
        type: 'address',
      },
    ],
    name: 'getHashNonce',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: {},
    name: 'incrementHashNonce',
    outputs: {},
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTSellOrder',
        name: 'sellOrder',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'contract IPropertyValidator',
                name: 'propertyValidator',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'propertyData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Property[]',
            name: 'nftProperties',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTBuyOrder',
        name: 'buyOrder',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'enum LibSignature.SignatureType',
            name: 'signatureType',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct LibSignature.Signature',
        name: 'sellOrderSignature',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'enum LibSignature.SignatureType',
            name: 'signatureType',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct LibSignature.Signature',
        name: 'buyOrderSignature',
        type: 'tuple',
      },
    ],
    name: 'matchERC721Orders',
    outputs: [
      {
        internalType: 'uint256',
        name: 'profit',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: 'success',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'contract IPropertyValidator',
                name: 'propertyValidator',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'propertyData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Property[]',
            name: 'nftProperties',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTBuyOrder',
        name: 'order',
        type: 'tuple',
      },
    ],
    name: 'preSignERC721BuyOrder',
    outputs: {},
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTSellOrder',
        name: 'order',
        type: 'tuple',
      },
    ],
    name: 'preSignERC721SellOrder',
    outputs: {},
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'contract IPropertyValidator',
                name: 'propertyValidator',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'propertyData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Property[]',
            name: 'nftProperties',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTBuyOrder',
        name: 'buyOrder',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'enum LibSignature.SignatureType',
            name: 'signatureType',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct LibSignature.Signature',
        name: 'signature',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'erc721TokenId',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'unwrapNativeToken',
        type: 'bool',
      },
      {
        internalType: 'bytes',
        name: 'takerData',
        type: 'bytes',
      },
    ],
    name: 'sellERC721',
    outputs: {},
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'contract IPropertyValidator',
                name: 'propertyValidator',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'propertyData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Property[]',
            name: 'nftProperties',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTBuyOrder',
        name: 'order',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'enum LibSignature.SignatureType',
            name: 'signatureType',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct LibSignature.Signature',
        name: 'signature',
        type: 'tuple',
      },
    ],
    name: 'validateERC721BuyOrderSignature',
    outputs: {},
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'expiry',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'erc20Token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'erc20TokenAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'feeData',
                type: 'bytes',
              },
            ],
            internalType: 'struct LibNFTOrder.Fee[]',
            name: 'fees',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'nft',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibNFTOrder.NFTSellOrder',
        name: 'order',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'enum LibSignature.SignatureType',
            name: 'signatureType',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32',
          },
        ],
        internalType: 'struct LibSignature.Signature',
        name: 'signature',
        type: 'tuple',
      },
    ],
    name: 'validateERC721SellOrderSignature',
    outputs: {},
    stateMutability: 'view',
    type: 'function',
  },
]
