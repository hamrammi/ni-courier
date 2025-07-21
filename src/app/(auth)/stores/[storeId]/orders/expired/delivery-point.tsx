'use client'

import { DeliveryPointItem } from '@/lib/http/api-types'
import { useActionState } from 'react'
import { openCellsWithExpiredOrders } from '../actions'

export default function DeliveryPoint ({ deliveryPoint, storeId }: { deliveryPoint: DeliveryPointItem, storeId: number }) {
  const [state, action, pending] = useActionState(openCellsWithExpiredOrders.bind(null, storeId), { cells: [], touched: false })
  return (
    <form
      action={action}
      key={`delivery-point-${deliveryPoint.id}`}
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="dpId" value={deliveryPoint.id} className="hidden" />
      <div className="text-sm">
        {deliveryPoint.address}
      </div>
      {state.touched && state?.error && (
        <div className="text-sm bg-pink-100 text-pink-700 rounded-xl py-2 px-4 border border-pink-500 mb-4">{state.error}</div>
      )}
      {state.touched && state.cells && state.cells?.length === 0 && (
        <div className="bg-amber-100 px-4 py-2 border border-amber-500 rounded-lg">Нет просроченных заказов</div>
      )}
      {state.touched && state.cells && state.cells?.length > 0 && (
        <div className="bg-emerald-100 px-4 py-2 border border-emerald-500 rounded-lg">
          Открылись ячейки: {state.cells.join(', ')}
        </div>
      )}
      <button
        className="p-4 bg-white rounded-xl shadow w-full font-semibold shadow-zinc-400 cursor-pointer"
        type="submit"
        disabled={pending}
      >
        Забрать просроченные заказы
      </button>
      <div className="border-b border-dashed text-slate-500"></div>
    </form>
  )
}
