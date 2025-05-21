import api from '@/lib/http'
import { OctagonAlert } from 'lucide-react'
import { openCellsWithExpiredOrders } from '../actions'

export default async function OrdersExpiredPage ({ params }: { params: { storeId: string } }) {
  const stores = await api.getStores()
  const { storeId } = await params
  const store = stores.items.find((store) => store.id === Number(storeId))

  const openCellsWithExpiredOrdersBound = openCellsWithExpiredOrders.bind(null, storeId)

  return (
    <div>
      <div className="font-black text-2xl my-10">Выберите точку выдачи</div>
      <div className="text-sm bg-pink-100 text-pink-700 rounded-xl py-2 px-4 border border-pink-500 mb-6 flex gap-4">
        <div className="mt-2"><OctagonAlert /></div>
        <div>
          Убедитесь что вы находитесь непосредственно у точки выдачи. <strong>После нажатия</strong> на соответствующую
          кнопку <strong>будут открыты все ячейки</strong> в которых хранятся просроченные заказы.
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {store?.deliveryPoints.map((dp) => (
          <form
            action={openCellsWithExpiredOrdersBound}
            key={dp.id}
            className="flex"
          >
            <input type="hidden" name="dpId" value={dp.id} className="hidden" />
            <button
              className="p-4 border border-black rounded-xl shadow w-full"
              type="submit"
            >
              Забрать заказы из {dp.address}
            </button>
          </form>
        ))}
      </div>
    </div>
  )
}
