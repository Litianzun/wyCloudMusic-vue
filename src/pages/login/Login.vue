<template>
    <div>
        <h2>{{title}}</h2>
        <el-button>click</el-button>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElButton } from 'element-plus'

export default defineComponent({
    name: 'login',
    // components: {
    //     NButton
    // },
    setup() {
        let router = useRouter();
        let route = useRoute();
        let title = '请登录'
        return {
            title
        }
    },
})
</script>

<style scoped lang="scss">
h2{
    color: red;
}
</style>
