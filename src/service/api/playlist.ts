import http from '@/service/http'
import * as T from './types'

/**
 * 歌单
 */
const playlistApi: T.IPlaylistDetailApi = {
  detail(params) {
    return http.get('/playlist/detail', params)
  },
}
export default playlistApi
