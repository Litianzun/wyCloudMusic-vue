import http from '@/service/http'
import * as T from './types'

const bannerApi: T.IBannerApi = {
    list(params){
        return http.get('/banner', params)
    }

}
export default bannerApi