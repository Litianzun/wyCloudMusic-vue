export interface ILoginPhoneParams {
  phone: string | number
  password: string
  md5_password: string
  captcha?: string | number
}
export interface ILoginEmailParams {
  email: string
  password: string
  md5_password: string
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
export interface ISingersParams {
  offset?: number
  limit?: number
}
export interface IUserInfoParams {
  uid: string | number
}
export interface IUserPlaylistParams {
  uid: string | number
}
export interface ISongParams {
  id: string
}

export interface ILoginApi {
  login_phone: (params: ILoginPhoneParams) => Promise<any>
  login_email: (params: ILoginEmailParams) => Promise<any>
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
export interface ISingersApi {
  list: (params: ISingersParams) => Promise<any>
}
export interface IUserApi {
  info: (params: IUserInfoParams) => Promise<any>
  playlist: (params: IUserPlaylistParams) => Promise<any>
}
export interface ISongApi {
  url: (params: ISongParams) => Promise<any>
}
