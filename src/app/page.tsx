import { getUserOrRedirect } from '@/lib/auth'
import Link from 'next/link'

export default async function ProductListPage () {
  const user = await getUserOrRedirect('/')
  console.log('page:user', user)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-violet-500 to-amber-500">
      <div>main page</div>
      <Link href="/me" className="mt-4 text-lg hover:underline">Go ME</Link>
    </div>
  )
}
