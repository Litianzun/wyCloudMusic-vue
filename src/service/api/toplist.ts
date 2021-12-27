/**
 * 榜单
 */
import http from '@/service/http'
import * as T from './types'

const toplistApi: T.IToplistParams = {
  list() {
    return http.get('/toplist')
  },
}
export default toplistApi
