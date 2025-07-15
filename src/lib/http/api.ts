import { getSession } from '../session'
import { AuthLoginResponse, AuthRefreshResponse, OrdersResponse, ProfileResponse, ReturnOrdersIntoStoreResponse, StoresResponse } from './api-types'

class ApiError extends Error {
  code: number = 0
  validationErrors: Record<string, string> = {}
  constructor(code: number, message: string, validationErrors: Record<string, string> = {}) {
    super(message)
    this.code = code
    this.validationErrors = validationErrors
  }
}
export class ApiValidationError extends ApiError { }
class ApiDomainError extends ApiError { }
class ApiUnhandledError extends ApiError { }
class ApiUnauthorizedError extends ApiError { }
class ApiBadRequestError extends ApiError { }
class ApiForbiddenError extends ApiError { }

export default class Api {
  authLogin (login: string, password: string) {
    return this.fetchPost<AuthLoginResponse>(
      '/auth/login',
      { login, password }
    )
  }

  authRefresh (refreshToken: string) {
    return this.fetchPost<AuthRefreshResponse>(
      '/auth/refresh-token',
      { refreshToken }
    )
  }

  getOrders ({ type, storeId, dpId }: { type: string, storeId?: number, dpId?: number }) {
    const search = new URLSearchParams()
    search.set('type', type)
    if (storeId) search.set('store_id', storeId.toString())
    if (dpId) search.set('dp_id', dpId.toString())
    return this.fetchGet<OrdersResponse>(`/orders?${search.toString()}`)
  }

  getOrder (orderId: number) {
    return this.fetchPost<null>(`/orders/${orderId}/get`, {})
  }

  putOrder (orderId: number, destination: 'store' | 'delivery-point') {
    return this.fetchPost<null>(`/orders/${orderId}/put?destination=${destination}`, {})
  }

  getStores () {
    return this.fetchGet<StoresResponse>('/stores')
  }

  returnOrders (storeId: number, deliveryPointId: number) {
    return this.fetchPost<ReturnOrdersIntoStoreResponse>(`/orders/return?storeId=${storeId}&deliveryPointId=${deliveryPointId}`, {})
  }

  getProfile () {
    return this.fetchGet<ProfileResponse>('/profile')
  }

  subscribeWebPush (endpoint: string, auth: string, p256dh: string) {
    return this.fetchPost<null>(`/profile/subscriptions`, {
      endpoint,
      auth,
      p256dh
    })
  }

  unsubscribeWebPush (endpoint: string, auth: string, p256dh: string) {
    return this.fetchDelete<null>(`/profile/subscriptions`, {
      endpoint,
      auth,
      p256dh
    })
  }

  private async fetchGet<RT> (url: string) {
    const { accessToken } = await getSession()
    const res = await fetch(process.env.API_URL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    })
    return this.getDataOrThrow<RT>(res)
  }

  private async fetchPost<RT> (url: string, body: Record<string, unknown>) {
    const { accessToken } = await getSession()
    const res = await fetch(process.env.API_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify(body)
    })
    return this.getDataOrThrow<RT>(res)
  }

  private async fetchDelete<RT> (url: string, body: Record<string, unknown>) {
    const { accessToken } = await getSession()
    const res = await fetch(process.env.API_URL + url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify(body)
    })
    return this.getDataOrThrow<RT>(res)
  }

  private async getDataOrThrow<RT> (res: Response) {
    const json = await res.json()
    // console.log('JSON >>>>', JSON.stringify(json))
    if (res.ok) {
      if (json.status === 'success') {
        return json.data as RT
      }
      throw new ApiDomainError(res.status, json?.data?.message || 'Unknown error')
    }
    if (res.status === 400) {
      throw new ApiBadRequestError(res.status, json?.data?.message || 'Unknown error')
    }
    if (res.status === 401) {
      throw new ApiUnauthorizedError(res.status, json?.data?.message || 'Unknown error')
    }
    if (res.status === 403) {
      throw new ApiForbiddenError(res.status, json?.data?.message || 'Unknown error')
    }
    if (res.status === 422) {
      if (json?.data?.message) {
        throw new ApiValidationError(res.status, json.data.message)
      }
      const validationErrors = ((json?.data || []) as { field: string, message: string }[])
        .reduce((acc: Record<string, string>, error) => {
          acc[error.field] = error.message
          return acc
        }, {})
      throw new ApiValidationError(res.status, '', validationErrors)
    }
    throw new ApiUnhandledError(res.status, json?.data?.message || 'Unknown error')
  }
}
