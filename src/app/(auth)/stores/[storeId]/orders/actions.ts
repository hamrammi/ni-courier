'use server'

import httpApi from '@/lib/http'
import { revalidatePath } from 'next/cache'

export async function putOrderIntoCell (orderId: number) {
  try {
    await httpApi.putOrder(orderId, 'delivery-point')
    revalidatePath('/orders/delivering')
  } catch (e) {
    return { error: (e as Error).message }
  }
}

export async function getOrderIntoDelivery (orderId: number) {
  try {
    await httpApi.getOrder(orderId)
    revalidatePath('/orders/assembled')
  } catch (e) {
    return { error: (e as Error).message }
  }
}

export async function putOrderIntoStore (orderId: number) {
  try {
    await httpApi.putOrder(orderId, 'store')
    revalidatePath('/orders/returning')
  } catch (e) {
    return { error: (e as Error).message }
  }
}

export async function openCellsWithExpiredOrders (storeId: number, prevState: unknown, formData: FormData) {
  try {
    const deliveryPointId = formData.get('dpId')
    const res = await httpApi.returnOrders(Number(storeId), Number(deliveryPointId))
    return { cells: res.cells, touched: true }
  } catch (e) {
    return { error: (e as Error).message, touched: true }
  }
}
