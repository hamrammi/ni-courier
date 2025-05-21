import express from 'express'
import fs from 'node:fs'
import { SignJWT } from 'jose'

const app = express()
const port = 3003

app.use('/public', express.static('public'))

async function createFakeTokens () {
  return {
    accessToken: await new SignJWT({ courier_id: '101' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('60m')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET)),
    refreshToken: await new SignJWT({ courier_id: '101' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1440m')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET))
  }
}

app.post('/auth/login', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send({
    status: 'success',
    data: await createFakeTokens()
  })
})

app.post('/auth/refresh', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send({
    status: 'success',
    data: await createFakeTokens()
  })
})


app.get('/orders', (req, res) => {
  const { type } = req.query
  const rawContent = fs.readFileSync('fake-data.json', 'utf-8')
  const fakeData = JSON.parse(rawContent)
  const items = fakeData.orders.items.filter((order) => order.status === type)
  res.setHeader('Content-Type', 'application/json')
  res.send({
    status: 'success',
    data: {
      items
    }
  })
})

app.post('/orders/:orderId/get', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const rawContent = fs.readFileSync('fake-data.json', 'utf-8')
  const fakeData = JSON.parse(rawContent)
  const idx = fakeData.orders.items.findIndex((order) => order.id === Number(req.params.orderId))
  if (fakeData.orders.items[idx].status === 'assembled') {
    fakeData.orders.items[idx].status = 'delivering'
  }
  if (fakeData.orders.items[idx].status === 'expired') {
    fakeData.orders.items[idx].status = 'returning'
  }
  const json = JSON.stringify(fakeData, null, 2)
  fs.writeFileSync('fake-data.json', json, 'utf-8')
  res.send({
    status: 'success',
    data: null
  })
})

app.post('/orders/:orderId/put', (req, res) => {
  const { destination } = req.query
  const rawContent = fs.readFileSync('fake-data.json', 'utf-8')
  const fakeData = JSON.parse(rawContent)
  const idx = fakeData.orders.items.findIndex((order) => order.id === Number(req.params.orderId))
  if (fakeData.orders.items[idx].status === 'delivering') {
    if (destination === 'store') {
      fakeData.orders.items[idx].status = 'assembled'
    } else {
      fakeData.orders.items[idx].status = 'expired'
    }
  }
  if (fakeData.orders.items[idx].status === 'returning') {
    fakeData.orders.items.splice(idx, 1)
  }
  const json = JSON.stringify(fakeData, null, 2)
  fs.writeFileSync('fake-data.json', json, 'utf-8')
  res.setHeader('Content-Type', 'application/json')
  res.send({
    status: 'success',
    data: null
  })
})

app.get('/stores', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send({
    status: 'success',
    data: {
      items: [
        {
          id: 1,
          title: 'Магазин 1',
          photo: null,
          deliveryPoints: [
            {
              id: 1,
              address: 'test address'
            },
            {
              id: 2,
              address: 'test address 2'
            }
          ]
        },
        {
          id: 2,
          title: 'Магазин 2',
          photo: 'http://127.0.0.1:3003/public/bakery.jpg',
          deliveryPoints: [
            {
              id: 3,
              address: 'test address'
            },
          ]
        }
      ]
    }
  })
})

app.post('/orders/return', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send({
    status: 'success',
    data: null
  })
})

app.listen(port, () => {
  console.log(`Fake server listening on port ${port}`)
})
