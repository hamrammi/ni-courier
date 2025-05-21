import { getUserOrRedirect } from '@/lib/auth'
import httpApi from '@/lib/http'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import Button from './button'

export default async function OrdersAssembledPage ({ params }: { params: { storeId: string } }) {
  const { storeId } = await params
  console.log('storeId', storeId)
  await getUserOrRedirect(`/stores/${storeId}/orders/assembled`)
  const orders = await httpApi.getOrders({ type: 'assembled' })

  return (
    <div className="flex flex-col gap-6">
      <Link href={`/stores/${storeId}/orders`} className="flex gap-2 items-center text-violet-500">
        <ChevronLeft />
        <span className="underline underline-offset-4">На главную</span>
      </Link>
      <div className="font-black text-center text-3xl">Забрать из магазина</div>
      <div className="grid grid-cols-1 gap-6">
        {orders.items.map((order) => (
          <div key={order.id} className="bg-white shadow-md rounded-lg rounded-t-xl">
            <h2 className="text-xl font-black px-4 py-3 rounded-lg bg-slate-300 text-slate-800"># {order.number}</h2>
            <div className="p-4">
              <div className="text-xs uppercase text-gray-500 mb-1 font-bold">Доставить:</div>
              <div className="mb-4">
                {order.deliveryPoint.address}
              </div>
              <div className="text-xs uppercase text-gray-500 mb-1 font-bold">Состав заказа:</div>
              <div className="list-disc list-inside">
                {order.items.map((item) => (
                  <div key={item.productId} className="text-gray-800 text-sm">
                    {item.title} - {item.quantity}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button orderId={order.id} />
              </div>
            </div>
          </div>
        ))}
        {orders.items.length === 0 && (
          <div className="text-center">
            Нет заказов
          </div>
        )}
      </div>
    </div>
  )
}
