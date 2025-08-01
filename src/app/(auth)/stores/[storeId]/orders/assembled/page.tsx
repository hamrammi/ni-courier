import OrderList from '@/components/orders/order-list'
import httpApi from '@/lib/http'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default async function OrdersAssembledPage ({ params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await params
  const orders = await httpApi.getOrders({ type: 'assembled' })
  const stores = await httpApi.getStores()
  const store = stores.items.find((store) => store.id === Number(storeId))

  return (
    <div className="flex flex-col gap-6">
      <Link href={`/stores/${storeId}/orders`} className="flex gap-2 items-center text-violet-500">
        <ChevronLeft />
        <span className="underline underline-offset-4">На главную</span>
      </Link>
      <div className="font-black text-center text-3xl">Забрать из магазина</div>
      {store && (
        <OrderList
          orders={orders}
          type="assembled"
          store={store}
        />
      )}
    </div>
  )
}
