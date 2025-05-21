import { getUserOrRedirect } from '@/lib/auth'
import { Package, Refrigerator, Store } from 'lucide-react'
import Link from 'next/link'

export default async function OrderSelectionPage ({ params }: { params: { storeId: string } }) {
  const { storeId } = await params
  await getUserOrRedirect(`/stores/${storeId}/orders`)

  const orders = [
    {
      href: `/stores/${storeId}/orders/assembled`,
      title: 'Забрать из магазина',
      icon: <Package />
    },
    {
      href: `/stores/${storeId}/orders/delivering`,
      title: 'Положить в пункт выдачи',
      icon: <Refrigerator />
    },
    {
      href: `/stores/${storeId}/orders/returning`,
      title: 'Вернуть в магазин',
      icon: <Store />
    }
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="font-black text-3xl mt-10 text-center">Списки заказов</div>
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

      <div className="mt-10">
        <Link
          className="py-4 bg-black text-white rounded-xl flex justify-center"
          href={`/stores/${storeId}/orders/expired`}
        >
          Забрать возврат
        </Link>
      </div>
    </div>
  )
}
