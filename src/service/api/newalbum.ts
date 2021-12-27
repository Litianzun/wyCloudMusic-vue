/**
 * 推荐歌单
 */
import http from '@/service/http'
import * as T from './types'

const newalbumApi: T.INewalbumApi = {
  list(params) {
    return http.get('/top/album', params)
  },
}
export default newalbumApi
