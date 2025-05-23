import { getUserOrRedirect } from '@/lib/auth'
import httpApi from '@/lib/http'
import { Mail, Smartphone } from 'lucide-react'

export default async function ProfilePage () {
  await getUserOrRedirect('/profile')
  const profile = await httpApi.getProfile()
  return (
    <div>
      <div className="my-10 font-black text-3xl">Профиль</div>
      <div className="flex flex-col gap-4">
        <div className="font-black">{profile.name}</div>
        <div className="flex gap-3 items-center"><Smartphone size={16} /> {profile.phone}</div>
        <div className="flex gap-3 items-center"><Mail size={16} /> {profile.email}</div>
      </div>
    </div>
  )
}
