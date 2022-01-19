import http from '@/service/http'
import * as T from './types'

const songApi: T.ISongApi = {
    url(params){
        return http.get('/song/url', params)
    }

}
export default songApi