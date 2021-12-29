<template>
  <nav-header></nav-header>
  <router-view />
  <nav-footer></nav-footer>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import NavHeader from '@/components/navHeader/NavHeader.vue'
import { useRouter, useRoute } from 'vue-router'
import NavFooter from '@/components/navFooter/NavFooter.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.el-carousel__button {
  width: 20px !important;
}
.el-tabs--border-card>.el-tabs__content{
  padding: 0;
}
.el-input__prefix-inner{
  align-items: center;
}
.el-input--prefix .el-input__inner{
  padding-left: 20px;
}
</style>
