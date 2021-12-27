<template>
  <div class="m-footer">
    <footer class="footer-container">
      <small>个人学习开发，不用于任何商业用途</small>
    </footer>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/runtime-core'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'navFooter',
  setup() {
    return {}
  },
})
</script>

<style scoped lang="scss">
.m-footer {
  position: relative;
  height: 172px;
  overflow: hidden;
  border-top: 1px solid #d3d3d3;
  background: #f2f2f2;
  .foooter-container {
    width: 980px;
    margin: 0 auto;
  }
  small {
    display: block;
    color: #666;
    text-align: center;
    line-height: 170px;
  }
}
</style>
