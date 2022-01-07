import { defineStore } from 'pinia'

type IProfile = {
  
}
export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    name: '超级管理员',
    loginVisible: false, //登录弹窗
    profile: <object | null>null, //用户信息
  }),
  getters: {
    nameLength: (state) => state.name.length,
  },
  actions: {
    //弹窗登录
    switchLoginVisible(payload: boolean) {
      this.loginVisible = payload
    },
    setProfile(payload: object) {
      sessionStorage.setItem('profile', JSON.stringify(payload))
      this.profile = payload
    },
    setAccount(payload: object) {
      sessionStorage.setItem('account', JSON.stringify(payload))
    },
  },
})
