import { expect, it } from '@jest/globals'
import fetch from 'node-fetch'

// Не пригодилось, но сделал, чтобы попрактиковаться
async function getToken () {
  const res = await fetch(
    'https://dummyjson.com/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'kminchelle',
        password: '0lelplR'
      })
    }
  )
  const data = await res.json()
  const token = data.token
  return token
}

describe('dummyjson API Testing', () => {
  it('GET /products is 200 OK', async () => {
    const URI = 'https://dummyjson.com/products'
    const response = await fetch(URI)
    const data = await response.json()
    console.log(data)
    expect(response.status).toBe(200)
  })
  it('Invalid credentials', async () => {
    const res = await fetch(
      'https://dummyjson.com/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'kminchelle',
          password: 'qwerty'
        })
      }
    )
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data).toHaveProperty('message')
    expect(data.message).toEqual('Invalid credentials')
  })
  it('Successfully received auth token', async () => {
    const res = await fetch(
      'https://dummyjson.com/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Креды нужно выносить в .env
        body: JSON.stringify({
          username: 'kminchelle',
          password: '0lelplR'
        })
      }
    )
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data).toHaveProperty('token')
  })
  it('Successfully added a product', async () => {
    const res = await fetch(
      'https://dummyjson.com/products/add',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'DJI Mini 3 Pro'
        })
      }
    )
    expect(res.status).toBe(200)
  })
  it('Incorrent product ID for update', async () => {
    const randomValue = 'hype'
    const res = await fetch(
      `https://dummyjson.com/products/${randomValue}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'DJI Mini 3 Pro Max'
        })
      }
    )
    const data = await res.json()
    expect(res.status).toBe(404)
    expect(data).toHaveProperty('message')
    console.log(data.message)
    expect(data.message).toEqual('Product with id \'' + randomValue + '\' not found')
  })
})
