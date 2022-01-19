<template>
  <span class="box-header">
    <b>评论</b>
    <span>共{{ songsLength }}条评论 </span></span
  >
</template>

<script>
import { defineComponent, ref, onMounted, computed } from '@vue/runtime-core'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'comment',
  components: {},
  props: {},
  setup(props, ctx) {
    return {}
  },
})
</script>

<style scoped lang="scss">
.box-header {
  padding: 0 10px 0 32px;
  margin-top: 22px;
  display: block;
  border-bottom: 2px solid #c20c0c;
  line-height: 28px;
  b {
    font-size: 18px;
  }
  > span {
    margin: 9px 0 0 20px;
    color: #666;
    font-size: 12px;
  }
}
</style>
