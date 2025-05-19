export interface AuthLoginResponse {
  accessToken: string
  refreshToken: string
}

export interface AuthRefreshResponse {
  accessToken: string
  refreshToken: string
}

export interface OrdersResponse {
  items: Array<{
    id: number
    number: string
    date: number
    pickUpTime: string
    storeId: number
    status: string
    sum: string
    deliveryPoint: {
      id: number
      address: string
      state: string
    },
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
  }>
}
