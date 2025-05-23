export interface AuthLoginResponse {
  accessToken: string
  refreshToken: string
}

export interface AuthRefreshResponse {
  accessToken: string
  refreshToken: string
}

export interface OrdersResponse {
  items: Array<OrderItem>
}

export interface StoresResponse {
  items: Array<{
    id: number
    title: string
    photo: string | null
    deliveryPoints: DeliveryPointItem[]
  }>
}

export interface ReturnOrdersIntoStoreResponse {
  cells: number[]
}

export interface OrderItem {
  id: number
  number: string
  date: number
  pickUpTime: string
  storeId: number
  status: string
  sum: string
  deliveryPointId: number
  pinCode: string
  cells: string[],
  items: Array<{
    productId: number
    title: string
    price: string
    quantity: number
    photo: string
    description: string
  }>
}

export interface DeliveryPointItem {
  id: number
  address: string
}

export interface ProfileResponse {
  name: string
  phone: string
  email: string
}
