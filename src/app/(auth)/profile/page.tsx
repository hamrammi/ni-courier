import httpApi from '@/lib/http'
import { deleteSession } from '@/lib/session'
import { Mail, Smartphone } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function ProfilePage () {
  async function logout () {
    'use server'
    await deleteSession()
    redirect('/login')
  }
  const profile = await httpApi.getProfile()
  return (
    <div>
      <div className="my-10 font-black text-3xl">Профиль</div>
      <div className="flex flex-col gap-4">
        <div className="font-black">{profile.name}</div>
        <div className="flex gap-3 items-center"><Smartphone size={16} /> {profile.phone}</div>
        <div className="flex gap-3 items-center"><Mail size={16} /> {profile.email}</div>
      </div>
      <div>
        <button
          className={"mt-10 border-1 border-violet-500 hover:bg-violet-500 hover:text-white text-violet-500 py-2 font-semibold rounded-lg w-full"}
          onClick={logout}
        >Выйти</button>
      </div>
    </div>
  )
}
