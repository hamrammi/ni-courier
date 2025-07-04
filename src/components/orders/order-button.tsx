import { getOrderIntoDelivery, putOrderIntoCell, putOrderIntoStore } from '@/app/(auth)/stores/[storeId]/orders/actions'
import { OrderItem } from '@/lib/http/api-types'
import { startTransition, useActionState } from 'react'


type Props = {
  order: OrderItem
  type: 'assembled' | 'delivering' | 'expired' | 'returning'
}
export default function OrderButton (props: Props) {
  const [getOrderIntoDeliveryState, getOrderIntoDeliveryAction, getOrderIntoDeliveryPending] = useActionState(getOrderIntoDelivery.bind(null, props.order.id), { error: '' })
  const [putOrderIntoCellState, putOrderIntoCellAction, putOrderIntoCellPending] = useActionState(putOrderIntoCell.bind(null, props.order.id), { error: '' })
  const [putOrderIntoStoreState, putOrderIntoStoreAction, putOrderIntoStorePending] = useActionState(putOrderIntoStore.bind(null, props.order.id), { error: '' })

  if (props.type === 'assembled') {
    return (
      <>
        {getOrderIntoDeliveryState?.error && (
          <div className="text-sm bg-pink-100 text-pink-700 rounded-xl py-2 px-4 border border-pink-500 mb-4">{getOrderIntoDeliveryState.error}</div>
        )}
        {props.order.processable && (
          <button
            className="border-1 border-violet-500 hover:bg-violet-500 hover:text-white text-violet-500 py-2 font-semibold rounded-lg w-full"
            onClick={() => { startTransition(getOrderIntoDeliveryAction) }}
            disabled={getOrderIntoDeliveryPending}
          >
            Забрал в доставку
          </button>
        )}
      </>
    )
  }

  if (props.type === 'delivering') {
    return (
      <>
        {putOrderIntoCellState?.error && (
          <div className="text-sm bg-pink-100 text-pink-700 rounded-xl py-2 px-4 border border-pink-500 mb-4">{putOrderIntoCellState.error}</div>
        )}
        {props.order.processable && (
          <button
            className="border-1 border-violet-500 hover:bg-violet-500 hover:text-white text-violet-500 py-2 font-semibold rounded-lg w-full"
            onClick={() => { startTransition(putOrderIntoCellAction) }}
            disabled={putOrderIntoCellPending}
          >
            Положить в ячейку
          </button>
        )}
      </>
    )
  }

  if (props.type === 'returning') {
    return (
      <>
        {putOrderIntoStoreState?.error && (
          <div className="text-sm bg-pink-100 text-pink-700 rounded-xl py-2 px-4 border border-pink-500 mb-4">{putOrderIntoStoreState.error}</div>
        )}
        {props.order.processable && (
          <button
            className="border-1 border-violet-500 hover:bg-violet-500 hover:text-white text-violet-500 py-2 font-semibold rounded-lg w-full"
            onClick={() => { startTransition(putOrderIntoStoreAction) }}
            disabled={putOrderIntoStorePending}
          >
            Вернул в магазин
          </button>
        )}
      </>
    )
  }

  return null
}
