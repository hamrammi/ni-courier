import api from '@/lib/http'
import Link from 'next/link'
import Image from 'next/image'
import { Store } from 'lucide-react'

export default async function StoresPage () {
  const stores = await api.getStores()
  return (
    <div>
      <div className="text-3xl font-black my-10">Магазины</div>
      <div className="flex flex-col gap-6">
        {stores.items.map((store) => (
          <div
            key={store.id}
          >
            <Link
              href={`/stores/${store.id}/orders`}
              className="flex items-center"
            >
              {store.photo && (
                <Image src={store.photo} alt={store.title} width={60} height={60} className="rounded-xl" />
              )}
              {!store.photo && (
                <div className="w-[60px] h-[60px] bg-white rounded-xl flex items-center justify-center">
                  <Store />
                </div>
              )}

              <span className="ml-4 font-bold">{store.title}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
