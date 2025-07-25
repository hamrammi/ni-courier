import { JWTPayload, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { cache } from 'react'
import 'server-only'

export interface SessionPayload extends JWTPayload {
  courier_id: string
}

export const cookieOpts = {
  httpOnly: true,
  sameSite: 'none' as const,
  secure: true,
  path: '/',
  maxAge: 60 * 60 * 24 * 30,
}

export const accessTokenName = 'newit.delivery-courier.access_token'
export const refreshTokenName = 'newit.delivery-courier.refresh_token'

export async function getSession () {
  const cookieStore = await cookies()
  return {
    accessToken: cookieStore.get(accessTokenName)?.value,
    refreshToken: cookieStore.get(refreshTokenName)?.value
  }
}

export async function createSession (accessToken: string, refreshToken: string) {
  const cookieStore = await cookies()
  cookieStore.set(accessTokenName, accessToken, cookieOpts)
  cookieStore.set(refreshTokenName, refreshToken, cookieOpts)
}

export async function deleteSession () {
  const cookieStore = await cookies()
  cookieStore.delete(accessTokenName)
  cookieStore.delete(refreshTokenName)
}

export class MissingAccessTokenError extends Error { }
export class MissingRefreshTokenError extends Error { }
export class ShouldRefreshTokensError extends Error { }
export class InvalidAccessAndRefreshTokensError extends Error { }

export const verifySession = cache(async () => {
  const { accessToken, refreshToken } = await getSession()
  if (!accessToken) throw new MissingAccessTokenError()
  if (!refreshToken) throw new MissingRefreshTokenError()
  try {
    await verifyToken(accessToken)
    return { accessToken, refreshToken }
  } catch (ae) {
    console.log('[lib:session] Error verifying accessToken', (ae as Error).message)
    try {
      await verifyToken(refreshToken)
    } catch (re) {
      console.log('[lib:session] Error verifying refreshToken', (re as Error).message)
      throw new InvalidAccessAndRefreshTokensError()
    }
    throw new ShouldRefreshTokensError()
  }
})

export async function verifyToken (token: string) {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET), {
    algorithms: ['HS256']
  })
  return payload as JWTPayload
}
