import httpApi from '@/lib/http'
import { revalidatePath } from 'next/cache'

export default function Button ({ orderId }: { orderId: number }) {
  async function handleClick () {
    'use server'
    await httpApi.getOrder(orderId)
    revalidatePath('/orders/expired')
  }
  return (
    <button
      className="border-1 border-violet-500 hover:bg-violet-500 hover:text-white text-violet-500 py-2 font-semibold rounded-lg w-full"
      onClick={handleClick}
    >
      Забрал из ячейки
    </button>
  )
}
