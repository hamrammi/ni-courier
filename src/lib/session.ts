import { JWTPayload, jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { cache } from 'react'
import 'server-only'

export interface SessionPayload extends JWTPayload {
  courier_id: string
}

const accessTokenName = 'newit.delivery-courier.access_token'
const refreshTokenName = 'newit.delivery-courier.refresh_token'

export async function getSession () {
  const cookieStore = await cookies()
  return {
    accessToken: cookieStore.get(accessTokenName)?.value,
    refreshToken: cookieStore.get(refreshTokenName)?.value
  }
}

export async function createSession (accessToken: string, refreshToken: string) {
  const cookieStore = await cookies()
  const opts = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    path: '/',
  }
  cookieStore.set(accessTokenName, accessToken, opts)
  cookieStore.set(refreshTokenName, refreshToken, opts)
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

async function verifyToken (token: string) {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET), {
    algorithms: ['HS256']
  })
  return payload as JWTPayload
}

export async function createFakeTokens () {
  return {
    accessToken: await new SignJWT({ courier_id: '101' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1m')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET)),
    refreshToken: await new SignJWT({ courier_id: '101' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('10m')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET))
  }
}
