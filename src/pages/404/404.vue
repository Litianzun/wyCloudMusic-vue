<template>
  <div class="wrapper">
    <el-result icon="error" title="页面找不到了" sub-title="请确认是否输入了正确的网址~">
      <template #extra>
        <el-button type="primary" size="medium" @click="goBack">返回上一级</el-button>
      </template>
    </el-result>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    let router = useRouter()
    let goBack = () => {
      router.go(-1)
    }
    return {
      goBack,
    }
  },
})
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px - 172px);
}
</style>
