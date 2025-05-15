import { createFakeTokens } from '../session'
import HttpApi from './http-api'

export default class FakeApi implements HttpApi {
  async refreshTokens (refreshToken: string) {
    console.log('Creating fake tokens', refreshToken)
    return await createFakeTokens()
  }
}
