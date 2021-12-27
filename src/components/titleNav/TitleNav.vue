<template>
  <div class="wrapper">
    <slot name="icon"></slot>
    <a>{{ title }}</a>
    <span class="more">
      <router-link to="/discover/playlist">更多 >></router-link>
    </span>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/runtime-core'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'titleNav',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style scoped lang="scss">
.wrapper {
  height: 33px;
  padding: 0 10px 0 10px;
  border-bottom: 2px solid #c10d0c;
  a {
    float: left;
    font-size: 20px;
    font-weight: normal;
    line-height: 28px;
    margin-left: 5px;
  }
  .more {
    float: right;
    a {
      color: #666;
      text-decoration: none;
      font-size: 13px;
      line-height: 32px;
    }
  }
}
</style>
