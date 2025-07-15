import { sendNotification, subscribeUser, unsubscribeUser } from './actions'
import { useEffect, useState } from 'react'

export default function useWebPush () {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream)
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker () {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
    const sub = await registration.pushManager.getSubscription()
    setSubscription(sub)
  }

  async function subscribe () {
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
    })
    setSubscription(sub)
    const serializedSub = JSON.parse(JSON.stringify(sub))
    await subscribeUser(serializedSub)
  }

  async function unsubscribe () {
    const serializedSub = JSON.parse(JSON.stringify(subscription))
    const result = await subscription?.unsubscribe()
    if (result) {
      setSubscription(null)
      await unsubscribeUser(serializedSub)
    }
  }

  async function send (message: string) {
    if (subscription) {
      await sendNotification(JSON.parse(JSON.stringify(subscription)), message)
    }
  }

  return {
    isSupported,
    send,
    subscribe,
    unsubscribe,
    subscription,
    isIOS,
    isStandalone,
    isReady,
  }
}
