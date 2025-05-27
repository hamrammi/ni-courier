'use server'

import { createSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import api from '@/lib/http'
import { ApiValidationError } from '@/lib/http/api'

export async function loginAction (prevState: { error: string }, formData: FormData) {
  const fd = {
    login: formData.get('login') as string,
    password: formData.get('password') as string
  }

  fd.login = fd.login.replace(/^(\+?7|8)/, '7')

  try {
    const data = await api.authLogin(fd.login, fd.password)
    await createSession(data.accessToken, data.refreshToken)
  } catch (e) {
    if (e instanceof ApiValidationError) {
      return { error: '', validationErrors: e.validationErrors }
    }
    return { error: (e as Error).message, validationErrors: {} }
  }
  const stores = await api.getStores()
  if (stores.items.length > 1) {
    redirect(`/stores`)
  } else {
    redirect(`/stores/${stores.items[0].id}/orders`)
  }
}
