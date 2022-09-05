import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from '@pancakeswap/localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCurrentBlock } from 'state/block/hooks'
import { ToastDescriptionWithTx } from 'components/Toast'
import useToast from 'hooks/useToast'
import { ChainId } from '@pancakeswap/sdk'
import { AppState, useAppDispatch } from '../index'
import { checkedTransaction, finalizeTransaction, MsgStatus, HarvestStatusType } from './actions'
import { fetchCelerApi } from './fetchCelerApi'

export function shouldCheck(
  currentBlock: number,
  tx: { addedTime: number; receipt?: any; lastCheckedBlockNumber?: number },
): boolean {
  if (tx.receipt) return false
  if (!tx.lastCheckedBlockNumber) return true
  const blocksSinceCheck = currentBlock - tx.lastCheckedBlockNumber
  if (blocksSinceCheck < 1) return false
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9
  }
  if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2
  }
  // otherwise every block
  return true
}

export default function Updater(): null {
  const { chainId, provider } = useActiveWeb3React()
  const { t } = useTranslation()

  const currentBlock = useCurrentBlock()

  const dispatch = useAppDispatch()
  const state = useSelector<AppState, AppState['transactions']>((s) => s.transactions)

  const transactions = useMemo(() => (chainId ? state[chainId] ?? {} : {}), [chainId, state])

  const { toastError, toastSuccess } = useToast()

  useEffect(() => {
    if (!chainId || !provider || !currentBlock) return

    Object.keys(transactions)
      .filter((hash) => shouldCheck(currentBlock, transactions[hash]))
      .forEach((hash) => {
        provider
          .getTransactionReceipt(hash)
          .then((receipt) => {
            if (receipt) {
              dispatch(
                finalizeTransaction({
                  chainId,
                  hash,
                  receipt: {
                    blockHash: receipt.blockHash,
                    blockNumber: receipt.blockNumber,
                    contractAddress: receipt.contractAddress,
                    from: receipt.from,
                    status: receipt.status,
                    to: receipt.to,
                    transactionHash: receipt.transactionHash,
                    transactionIndex: receipt.transactionIndex,
                  },
                }),
              )

              const toast = receipt.status === 1 ? toastSuccess : toastError
              toast(t('Transaction receipt'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
            } else {
              dispatch(checkedTransaction({ chainId, hash, blockNumber: currentBlock }))
            }
          })
          .catch((error) => {
            console.error(`failed to check transaction hash: ${hash}`, error)
          })
      })
  }, [chainId, provider, transactions, currentBlock, dispatch, toastSuccess, toastError, t])

  useEffect(() => {
    Object.keys(transactions)
      .filter(
        (hash) =>
          transactions[hash].type === 'non-bsc-farm-harvest' &&
          transactions[hash].farmHarvest.sourceChain.status === 1 &&
          transactions[hash].farmHarvest.destinationChain.status === HarvestStatusType.PENDING,
      )
      .forEach((hash) => {
        const fakeHash = '0xcdb7e81470bdc407ed3eafb2ca20d53ab0d29bcc00e94ad6d056a1d2d99ec59c' || hash // TODO: Harvest change to hash before merge
        fetchCelerApi(fakeHash)
          .then((response) => {
            const transaction = transactions[hash]
            const { destinationTxHash, messageStatus } = response
            const status =
              messageStatus === MsgStatus.MS_COMPLETED ? 1 : messageStatus === MsgStatus.MS_FAIL ? 0 : undefined
            dispatch(
              finalizeTransaction({
                chainId,
                hash: transaction.hash,
                receipt: { ...transaction.receipt },
                farmHarvest: {
                  ...transaction.farmHarvest,
                  destinationChain: {
                    ...transaction.farmHarvest.destinationChain,
                    status,
                    tx: destinationTxHash,
                    msgStatus: messageStatus,
                  },
                },
              }),
            )

            const { amount } = transaction.farmHarvest.sourceChain
            if (messageStatus === MsgStatus.MS_COMPLETED) {
              const toastText = t('%amount% CAKE have been successfully harvest to your BNB Smart Chain Wallet', {
                amount,
              })
              toastSuccess(
                toastText,
                <ToastDescriptionWithTx txHash={destinationTxHash} customizeChainId={ChainId.BSC} />,
              )
            } else if (messageStatus === MsgStatus.MS_FAIL) {
              const toastText = t('%amount% CAKE harvest is failed', { amount })
              toastError(
                toastText,
                <ToastDescriptionWithTx txHash={destinationTxHash} customizeChainId={ChainId.BSC} />,
              )
            }
          })
          .catch((error) => {
            console.error(`Failed to check harvest transaction hash: ${hash}`, error)
          })
      })
  }, [chainId, transactions, currentBlock, dispatch, toastSuccess, toastError, t])

  return null
}
