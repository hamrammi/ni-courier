import httpApi from '@/lib/http'
import { createSession, deleteSession, getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET (req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')
  const redirectUrl = searchParams.get('redirectUrl') as string

  if (action === 'delete') {
    await deleteSession()
    redirect('/login')
  }

  if (action === 'refresh') {
    const { refreshToken } = await getSession()
    if (refreshToken) {
      const data = await httpApi.authRefresh(refreshToken)
      await createSession(data.accessToken, data.refreshToken)
      redirect(redirectUrl)
    } else {
      await deleteSession()
      redirect('/login')
    }
  }
}
