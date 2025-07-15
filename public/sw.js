self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.message,
      icon: data.icon || '/apple-touch-icon.png',
      badge: '/apple-touch-icon.png',
      vibrate: [100, 50, 100],
      data: {
        storeId: data.store_id,
        orderId: data.order_id,
        clientId: data.client_id,
      },
    }
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close()
  const data = event.notification.data
  event.waitUntil(clients.openWindow(`https://заберусам.рф:3002/retailer/${data.storeId}/orders`))
})
