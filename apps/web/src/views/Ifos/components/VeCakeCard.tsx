import { Ifo } from '@pancakeswap/widgets-internal'

export function VeCakeCard() {
  const header = (
    <>
      <Ifo.MyICake />
      <Ifo.IfoSalesLogo />
    </>
  )

  return (
    <Ifo.VeCakeCard header={header}>
      <Ifo.MyVeCake />
    </Ifo.VeCakeCard>
  )
}
