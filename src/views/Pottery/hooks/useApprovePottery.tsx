import { useCallback } from 'react'
import useToast from 'hooks/useToast'
import useCatchTxError from 'hooks/useCatchTxError'
import { useTranslation } from 'contexts/Localization'
import { ToastDescriptionWithTx } from 'components/Toast'
import { MaxUint256 } from '@ethersproject/constants'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { getPotteryVaultAddress } from 'utils/addressHelpers'
import { useCake } from 'hooks/useContract'

export const useApprovePottery = () => {
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: isPending } = useCatchTxError()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { signer: cakeContract } = useCake()

  const onApprove = useCallback(async () => {
    const potteryContract = getPotteryVaultAddress()
    const receipt = await fetchWithCatchTxError(() => {
      return callWithGasPrice(cakeContract, 'approve', [potteryContract, MaxUint256])
    })

    if (receipt?.status) {
      toastSuccess(
        t('Success!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Please progress to the next step.')}
        </ToastDescriptionWithTx>,
      )
    }
  }, [cakeContract, t, callWithGasPrice, fetchWithCatchTxError, toastSuccess])

  return { isPending, onApprove }
}
