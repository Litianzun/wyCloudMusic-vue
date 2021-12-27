export interface ILoginParams {
  userName: string
  passWord: string | number
}
export interface IBannerParams {
  type?: 0 | 1 | 2 | 3
}
export interface IPersonalizedParams {
  limit?: number
}
export interface INewalbumParams {
  offset?: number
  limit?: number
  area?: 'ALL' | 'ZH' | 'EA' | 'KR' | 'JP'
  type?: 'new' | 'hot'
  year?: number
  month?: number
}
export interface IToplistParams {}
//歌单详情
export interface IPlaylistDetailParams {
  id: string | number
  s?: number
}

export interface ILoginApi {
  login: (params: ILoginParams) => Promise<any>
}
export interface IBannerApi {
  list: (params: IBannerParams) => Promise<any>
}
export interface IPersonalizedApi {
  list: (params: IPersonalizedParams) => Promise<any>
}
export interface INewalbumApi {
  list: (params: INewalbumParams) => Promise<any>
}
export interface IToplistApi {
  list: (params: IToplistParams) => Promise<any>
}
export interface IPlaylistDetailApi {
  detail: (params: IPlaylistDetailParams) => Promise<any>
}
