import http from '@/service/http'
import * as T from './types'

const singersApi: T.ISingersApi = {
    list(params){
        return http.get('/top/artists', params)
    }

}
export default singersApi