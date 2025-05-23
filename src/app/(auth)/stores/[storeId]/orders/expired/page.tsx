import api from '@/lib/http'
import { ChevronLeft, OctagonAlert } from 'lucide-react'
import Link from 'next/link'
import DeliveryPoint from './delivery-point'

export default async function OrdersExpiredPage ({ params }: { params: { storeId: string } }) {
  const { storeId } = await params
  const stores = await api.getStores()
  const store = stores.items.find((store) => store.id === Number(storeId))

  return (
    <div className="flex flex-col gap-6">
      <Link href={`/stores/${storeId}/orders`} className="flex gap-2 items-center text-violet-500">
        <ChevronLeft />
        <span className="underline underline-offset-4">На главную</span>
      </Link>
      <div className="font-black text-3xl text-center">Выберите точку выдачи</div>
      <div className="text-sm bg-pink-100 text-pink-700 rounded-xl py-2 px-4 border border-pink-500 flex gap-4">
        <div className="mt-2"><OctagonAlert /></div>
        <div>
          Убедитесь что вы находитесь непосредственно у точки выдачи. <strong>После нажатия</strong> на соответствующую
          кнопку <strong>будут открыты все ячейки</strong> в которых хранятся просроченные заказы.
        </div>
      </div>
      {store && (
        <div className="flex flex-col gap-6">
          {store?.deliveryPoints.map((dp) => (
            <DeliveryPoint
              key={`delivery-point-${dp.id}`}
              deliveryPoint={dp}
              storeId={Number(storeId)}
            />
          ))}
        </div>

      )}
    </div>
  )
}
