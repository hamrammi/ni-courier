import NavBar from '@/components/navbar'
import api from '@/lib/http'
import { Clock, Store } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function StoresPage () {
  const stores = await api.getStores()
  return (
    <>
      <NavBar />
      <div className="p-4">
        <div className="text-3xl font-black my-10">Магазины</div>
        <div className="flex flex-col gap-6">
          {stores.items.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-xl shadow"
            >
              <Link
                href={`/stores/${store.id}/orders`}
                className="flex items-center"
              >
                {store.photo && (
                  <Image src={store.photo} alt={store.title} width={80} height={80} className="rounded-xl" />
                )}
                {!store.photo && (
                  <div className="w-[80px] h-[80px] bg-white rounded-xl flex items-center justify-center">
                    <Store />
                  </div>
                )}

                <div className="ml-4">
                  <div className="font-bold text-lg">{store.title}</div>
                  <div className="text-sm mt-2 flex gap-1.5 items-center text-slate-700">
                    <Clock size={14} />
                    {store.orderAvailableFrom} - {store.orderAvailableTo}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
