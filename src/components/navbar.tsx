import api from '@/lib/http'
import { CircleUserRound, Store } from 'lucide-react'
import Link from 'next/link'

export default async function NavBar () {
  const stores = await api.getStores()

  return (
    <div className="bg-white w-full h-16 flex items-center p-4 shadow">

      {stores.items.length > 1 && (
        <Link href="/stores" className="flex items-center">
          <Store />
          <span className="ml-4 font-bold">Магазины</span>
        </Link>
      )}

      <div className="grow"></div>

      <div>
        <Link href="/profile">
          <CircleUserRound />
        </Link>

      </div>
    </div>
  )
}
