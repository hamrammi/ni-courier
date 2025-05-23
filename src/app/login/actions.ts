'use server'

import { createSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import api from '@/lib/http'

export async function loginAction (prevState: { error: string }, formData: FormData) {
  const fd = {
    login: formData.get('login') as string,
    password: formData.get('password') as string
  }

  const data = await api.authLogin(fd.login, fd.password)
  await createSession(data.accessToken, data.refreshToken)

  const stores = await api.getStores()
  if (stores.items.length > 1) {
    redirect(`/stores`)
  } else {
    redirect(`/stores/${stores.items[0].id}/orders`)
  }
}
