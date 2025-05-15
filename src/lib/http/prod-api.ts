import HttpApi from './http-api'

export default class ProdApi implements HttpApi {
  async refreshTokens (refreshToken: string) {
    return this.fetchPost<{ accessToken: string, refreshToken: string }>(
      '/client/refresh-token',
      { token: refreshToken }
    )
  }

  private async fetchPost<RT> (url: string, body: Record<string, unknown>) {
    const res = await fetch(process.env.API_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    return res.json() as RT
  }
}
