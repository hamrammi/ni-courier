'use server'

import httpApi from '@/lib/http'
import webpush from 'web-push'

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

export async function subscribeUser (sub: webpush.PushSubscription) {
  try {
    await httpApi.subscribeWebPush(sub.endpoint, sub.keys.auth, sub.keys.p256dh)
    return { success: true }
  } catch (e) {
    return { success: false, error: (e as Error).message }
  }
}

export async function unsubscribeUser (sub: webpush.PushSubscription) {
  try {
    await httpApi.unsubscribeWebPush(sub.endpoint, sub.keys.auth, sub.keys.p256dh)
    return { success: true }
  } catch (e) {
    return { success: false, error: (e as Error).message }
  }
}

export async function sendNotification (subscription: PushSubscription, message: string) {
  if (!subscription) {
    throw new Error('No subscription available')
  }

  try {
    await webpush.sendNotification(
      subscription as unknown as webpush.PushSubscription,
      JSON.stringify({
        title: 'Заберусам',
        body: message,
      })
    )
    return { success: true }
  } catch (error) {
    console.error('Error sending push notification:', error)
    return { success: false, error: 'Failed to send notification' }
  }
}
