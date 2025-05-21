'use server'

import api from '@/lib/http'

export async function openCellsWithExpiredOrders (storeId: string, formData: FormData) {
  console.log('storeId', storeId)
  const deliveryPointId = formData.get('dpId')
  console.log('deliveryPointId', deliveryPointId)
  // await api.returnOrders(storeId, deliveryPointId)
}
