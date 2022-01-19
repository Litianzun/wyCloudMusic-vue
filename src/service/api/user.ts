import http from '@/service/http'
import * as T from './types'

const userApi: T.IUserApi = {
  info(params) {
    return http.get('/user/detail', params)
  },
  playlist(params) {
    return http.get('/user/playlist', params)
  },
}
export default userApi
