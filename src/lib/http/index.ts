import FakeApi from './fake-api'
import HttpApi from './http-api'
import ProdApi from './prod-api'

let httpApi: HttpApi
if (process.env.ENVIRONMENT === 'dev') {
  httpApi = new FakeApi()
} else {
  httpApi = new ProdApi()
}

export default httpApi
