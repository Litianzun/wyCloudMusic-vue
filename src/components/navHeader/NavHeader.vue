<template>
  <div class="m-top">
    <header class="header-container">
      <h1 class="logo">
        <a href="/" class="logo-title">网易云音乐</a>
      </h1>
      <nav>
        <ul class="header-nav-box">
          <li @click="switchActiveTab(0)" :class="activeIndex === 0 ? 'active' : ''">
            <router-link to="/">发现音乐</router-link>
          </li>
          <li @click="switchActiveTab(1)" :class="activeIndex === 1 ? 'active' : ''">
            <router-link to="/my">我的音乐</router-link>
          </li>
          <li @click="switchActiveTab(2)" :class="activeIndex === 2 ? 'active' : ''">
            <router-link to="/friends">关注</router-link>
          </li>
          <li @click="switchActiveTab(3)" :class="activeIndex === 3 ? 'active' : ''">
            <a href="https://music.163.com/store/product" target="_blank">商城</a>
          </li>
          <li @click="switchActiveTab(4)" :class="activeIndex === 4 ? 'active' : ''">
            <a href="https://music.163.com/st/musician" target="_blank">音乐人</a>
          </li>
          <li @click="switchActiveTab(5)" :class="activeIndex === 5 ? 'active' : ''">
            <router-link to="/download">下载客户端</router-link>
          </li>
        </ul>
      </nav>
      <div class="right-content">
        <el-input
          v-model="searchInput"
          placeholder="音乐/视频/电台/用户"
          :prefix-icon="Search"
          size="small"
          class="search-box"
        />
        <div v-if="store.profile" class="avatar">
          <el-dropdown @command="handleCommand">
            <img :src="store.profile.avatarUrl" alt="avatar" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="loggout" :icon="SwitchButton">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <span
          v-else
          style="color: #fff; font-size: 14px; margin: 0 8px; cursor: pointer"
          @click="readyLogin"
          >登录</span
        >
      </div>
    </header>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/runtime-core'
import { useRouter, useRoute } from 'vue-router'
import { Search, SwitchButton } from '@element-plus/icons-vue'
import { useMainStore } from '@/store/main'
import { delCookie } from '@/utils/cookie'

export default defineComponent({
  name: 'navHeader',
  setup() {
    let store = useMainStore()
    let activeIndex = ref(0)
    let switchActiveTab = (i) => {
      activeIndex.value = i
    }
    const searchInput = ref('') //搜索关键字
    let readyLogin = () => {
      store.switchLoginVisible(true)
    }
    const handleCommand = (command) => {
      switch (command) {
        case 'loggout': {
          delCookie('userId')
          delCookie('_remember_me')
          delCookie('_csrf')
          delCookie('MUSIC_U')
          store.$reset();
          break;
        }
      }
    }
    return {
      activeIndex,
      switchActiveTab,
      searchInput,
      Search,
      SwitchButton,
      store,
      readyLogin,
      handleCommand,
    }
  },
})
</script>

<style scoped lang="scss">
.m-top {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  background: #242424;
}
.header-container {
  width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  .logo {
    width: 176px;
    height: 69px;
    background: url(@/assets/logo.png) no-repeat center center;
    background-size: cover;
    .logo-title {
      color: #ede7e7;
      font-size: 21px;
      display: inline-block;
      transform: translate(50px, 5px);
      letter-spacing: 3px;
      text-decoration: none;
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
  }
  .header-nav-box {
    display: flex;
    align-items: center;
    li {
      height: 70px;
      //   width: 94px;
      display: list-item;
      list-style: none;
      a {
        color: #fff;
        text-decoration: none;
        padding: 0 19px;
        text-align: center;
        font-size: 14px;
        line-height: 70px;
      }
      &:hover {
        background-color: #000;
      }
    }
    .active {
      background-color: #000;
    }
  }
  .right-content {
    display: flex;
    align-items: center;
    .search-box {
      width: 162px;
    }
    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 17px;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
  }
}
</style>
