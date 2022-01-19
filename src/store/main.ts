import { defineStore } from 'pinia'

type IProfile = {}
export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    name: '超级管理员',
    loginVisible: false, //登录弹窗
    profile: <object | null>null, //用户信息
    playSwitch: false, //播放器是否显示
    currentSong: <object | null>{
      name: '',
      ar: [],
      al: '',
      url: '',
    }, //当前播放歌曲
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
    setSong(payload: object) {
      this.currentSong = payload
    },
    setPlaySwitch(payload: boolean) {
      this.playSwitch = payload
    },
  },
})
