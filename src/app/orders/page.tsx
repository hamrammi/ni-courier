import { getUserOrRedirect } from '@/lib/auth'
import { Package, Refrigerator, Store, Undo2 } from 'lucide-react'
import Link from 'next/link'

export default async function OrderSelectionPage () {
  await getUserOrRedirect('/orders')

  const orders = [
    {
      href: '/orders/assembled',
      title: 'Забрать из магазина',
      icon: <Package />
    },
    {
      href: '/orders/delivering',
      title: 'Положить в пункт выдачи',
      icon: <Refrigerator />
    },
    {
      href: '/orders/expired',
      title: 'Забрать из пункта выдачи на возврат',
      icon: <Undo2 />
    },
    {
      href: '/orders/returning',
      title: 'Вернуть в магазин',
      icon: <Store />
    }
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="font-black text-3xl mt-10">Списки заказов</div>
      {orders.map((order) => (
        <Link
          key={order.href}
          href={order.href}
          className="bg-white hover:bg-violet-500 hover:text-white py-6 font-semibold rounded-xl w-full px-4 shadow flex gap-4"
        >
          {order.icon}
          {order.title}
        </Link>
      ))}
    </div>
  )
}
