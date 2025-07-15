import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import httpApi from './lib/http'
import { accessTokenName, cookieOpts, refreshTokenName, verifyToken } from './lib/session'

export async function middleware (request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-current-pathname', request.nextUrl.pathname)

  const session = {
    accessToken: request.cookies.get(accessTokenName)?.value,
    refreshToken: request.cookies.get(refreshTokenName)?.value
  }

  if (!session.accessToken || !session.refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    await verifyToken(session.accessToken)
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (e) {
    console.log('[middleware] Error verifying accessToken', (e as Error).message)
    try {
      await verifyToken(session.refreshToken)
    } catch (e) {
      console.log('[middleware] Error verifying refreshToken', (e as Error).message)
      return NextResponse.redirect(new URL('/login', request.url))
    }
    try {
      const tokens = await httpApi.authRefresh(session.refreshToken)
      requestHeaders.set('Cookie', `${accessTokenName}=${tokens.accessToken}; ${refreshTokenName}=${tokens.refreshToken}`)
      const response = NextResponse.next({
        request: {
          headers: requestHeaders
        }
      })
      response.cookies.set(accessTokenName, tokens.accessToken, cookieOpts)
      response.cookies.set(refreshTokenName, tokens.refreshToken, cookieOpts)
      console.log('[middleware] Tokens were successfully refreshed')
      return response
    } catch (e) {
      console.log('[middleware] Error getting new tokens', (e as Error).message)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|login|.*\\.png|favicon.ico|sitemap.xml|robots.txt$).*)'],
}
