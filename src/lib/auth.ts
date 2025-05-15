import { redirect } from 'next/navigation'
import { cache } from 'react'
import 'server-only'
import { InvalidAccessAndRefreshTokensError, MissingAccessTokenError, MissingRefreshTokenError, ShouldRefreshTokensError, verifySession } from './session'

export const getUserOrRedirect = cache(async (redirectUrl: string) => {
  try {
    const session = await verifySession()
    return {
      access: session.accessToken,
      user: {
        id: 101,
        name: 'John Doe'
      }
    }
  } catch (e) {
    if (
      e instanceof MissingAccessTokenError ||
      e instanceof MissingRefreshTokenError ||
      e instanceof InvalidAccessAndRefreshTokensError
    ) {
      redirect(`/api/manage-session?action=delete`)
    } else if (e instanceof ShouldRefreshTokensError) {
      redirect(`/api/manage-session?action=refresh&redirectUrl=${redirectUrl}`)
    } else {
      throw e
    }
  }
})
