import { OrdersResponse } from '@/lib/http/api-types'

export default function EmptyOrderList ({ orders }: { orders: OrdersResponse }) {
  if (orders.items.length === 0) {
    return (
      <div className="text-center bg-amber-100 border border-amber-500 rounded-xl py-2 px-4">
        Заказы отсутствуют
      </div>
    )
  }
  return null
}
