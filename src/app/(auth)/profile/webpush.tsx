'use client'

import useWebPush from './useWebPush'
import { Bell } from 'lucide-react'

export default function WebPushSection () {
  const { isSupported, subscribe, unsubscribe, subscription, isIOS, isReady } = useWebPush()

  const subscribeHandler = async () => {
    try {
      await subscribe()
    } catch (e) {
      window.alert((e as Error).message)
    }
  }

  const unsubscribeHandler = async () => {
    try {
      await unsubscribe()
    } catch (e) {
      window.alert((e as Error).message)
    }
  }

  return (
    <div className="my-8">
      <h3 className="text-3xl font-black mb-4">Уведомления</h3>
      {isReady && (
        <>
          {!isSupported && (
            <>
              {isIOS ? (
                <div className="bg-cyan-300 text-cyan-700">
                  <div className="font-bold">Как включить уведомления?</div>
                  <div>
                    <Bell />
                    Нажмите Поделиться в нижней части экрана и выберите На экран Домой (Add to Home Screen)
                  </div>
                </div>
              ) : (
                <div className="bg-rose-300 text-rose-700">
                  <div className="font-bold">Уведомления не поддерживаются</div>
                  <div>
                    <Bell />
                    К сожалению, уведомления не поддерживаются в этом браузере
                  </div>
                </div>
              )}
            </>
          )}
          {isSupported && (
            <>
              {subscription ? (
                <div>
                  <div className="mb-4 text-green-800">Вы подписаны на уведомления.</div>
                  <button onClick={unsubscribeHandler} className="rounded-xl h-10 text-base bg-black text-white px-4">Отписаться</button>
                </div>
              ) : (
                <div>
                  <div className="mb-4 text-red-800">Вы не подписаны на уведомления.</div>
                  <button onClick={subscribeHandler} className="rounded-xl h-10 text-base bg-black text-white px-4">Подписаться</button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div >
  )
}
