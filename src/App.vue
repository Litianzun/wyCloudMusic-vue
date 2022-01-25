<template>
  <nav-header></nav-header>
  <router-view />
  <nav-footer></nav-footer>
  <login />
  <play-media></play-media>
  <el-backtop></el-backtop>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NavHeader from '@/components/navHeader/NavHeader.vue'
import NavFooter from '@/components/navFooter/NavFooter.vue'
import Login from '@/components/login/Login.vue'
const PlayMedia = defineAsyncComponent(() => import('./components/playMedia/PlayMedia.vue'))
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.el-carousel__button {
  width: 20px !important;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
.el-input__prefix-inner {
  align-items: center;
}
.el-input--prefix .el-input__inner {
  padding-left: 20px;
}
.f-thide {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  display: inline-block;
  width: 100%;
}
.black-row{
  background-color: #555 !important;
}
.my-cell{
  color: #fff;
}
</style>
