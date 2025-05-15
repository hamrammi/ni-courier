'use server'

import { createFakeTokens, createSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function loginAction (prevState: { error: string }, formData: FormData) {
  const fd = {
    login: formData.get('login'),
    password: formData.get('password')
  }

  if (fd.login !== 'dev') {
    return {
      error: 'Login not found'
    }
  }

  if (fd.password !== 'test') {
    return {
      error: 'Incorrect password'
    }
  }

  const { accessToken, refreshToken } = await createFakeTokens()
  await createSession(accessToken, refreshToken)

  redirect('/')
}
