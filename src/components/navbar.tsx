import api from '@/lib/http'
import { CircleUserRound, Store } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default async function NavBar ({ storeId }: { storeId?: number }) {
  const stores = await api.getStores()
  const store = stores.items.find((store) => store.id === storeId)

  return (
    <div className="w-full h-16 flex items-center p-4 shadow backdrop-blur-lg bg-white/70">
      <Link href="/stores" className="flex items-center">
        <Store />
        {!storeId && (
          <span className="ml-3 font-bold">
            Магазин{stores.items.length > 1 ? 'ы' : ''}
          </span>
        )}
      </Link>

      <div className="grow flex justify-center">
        {store && (
          <div className="flex items-center">
            {store.photo && (
              <Image src={store.photo} alt={store.title} width={40} height={40} className="rounded-xl" />
            )}
            {!store.photo && (
              <div className="w-[40px] h-[40px] bg-white rounded-xl flex items-center justify-center">
                <Store />
              </div>
            )}
            <div className="ml-2">
              <div className="font-bold">{store.title}</div>
              <div className="text-xs mt-0.5 text-slate-700">
                {store.orderAvailableFrom} - {store.orderAvailableTo}
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <Link href="/profile">
          <CircleUserRound />
        </Link>

      </div>
    </div>
  )
}
