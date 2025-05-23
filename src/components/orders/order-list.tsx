'use client'

import { OrdersResponse, StoresResponse } from '@/lib/http/api-types'
import { AnimatePresence, motion } from 'motion/react'
import EmptyOrderList from './empty-order-list'
import OrderButton from './order-button'

type Props = {
  orders: OrdersResponse
  type: 'assembled' | 'delivering' | 'expired' | 'returning'
  store: StoresResponse['items'][number]
}
export default function OrderList (props: Props) {
  const deliveryPoints = props.store.deliveryPoints

  return (
    <AnimatePresence initial={false}>
      <motion.div
        className="grid grid-cols-1 gap-6"
        initial={{ opacity: 0.1, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        key={`delivering-${props.orders.items.length}`}
      >
        {props.orders.items.map((order) => (
          <div key={order.id} className="bg-white shadow-md rounded-lg rounded-t-xl">
            <h2 className="text-xl font-black px-4 py-3 rounded-lg bg-slate-300 text-slate-800"># {order.number}</h2>
            <div className="p-4">
              <div className="text-xs uppercase text-gray-500 mb-1 font-bold">Доставить:</div>
              <div className="mb-4">
                {props.type === 'assembled' && deliveryPoints.find((dp) => dp.id === order.deliveryPointId)?.address}
                {props.type === 'delivering' && deliveryPoints.find((dp) => dp.id === order.deliveryPointId)?.address}
                {props.type === 'returning' && props.store.title}
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
                <OrderButton
                  order={order}
                  type={props.type}
                />
              </div>
            </div>
          </div>
        ))}
        <EmptyOrderList orders={props.orders} />
      </motion.div>
    </AnimatePresence>
  )
}
