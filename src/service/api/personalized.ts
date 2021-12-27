/**
 * 推荐歌单
 */
 import http from '@/service/http'
 import * as T from './types'
 
 const personalizedApi: T.IPersonalizedApi = {
     list(params){
         return http.get('/personalized', params)
     }
 }
 export default personalizedApi