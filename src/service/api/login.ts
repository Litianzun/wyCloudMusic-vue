import http from '@/service/http'
import * as T from './types'

const loginApi: T.ILoginApi = {
  login_phone(params) {
    return http.get('/login/cellphone', params)
  },
  login_email(params) {
    return http.get('/login', params)
  },
}
export default loginApi
