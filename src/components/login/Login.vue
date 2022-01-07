<template>
  <el-dialog v-model="store.loginVisible" title="登录" width="530px" center>
    <el-form :model="form" :rules="rules" ref="loginFormRef">
      <el-form-item label="账号" prop="phone">
        <el-input v-model="form.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row justify="center">
          <el-button type="primary" @click="toLogin">登录</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useMainStore } from '@/store/main'
import loginRequest from '@/service/api/login'
import { setCookie } from '@/utils/cookie'

export default defineComponent({
  setup() {
    const store = useMainStore()
    const loginFormRef = ref(null)
    const form = reactive({
      phone: '',
      password: '',
    })
    const rules = reactive({
      phone: [
        {
          required: true,
          message: '请输入手机号',
          trigger: 'blur',
        },
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
      ],
    })
    let cancel = () => {
      store.loginVisible = false
    }
    let toLogin = () => {
      loginFormRef.value.validate((valid, errObj) => {
        console.log(valid, errObj)
        if (valid) {
          loginFunc()
        }
      })
    }
    let loginFunc = async () => {
      //获取新碟
      try {
        const res = await loginRequest.login_phone({
          phone: form.phone,
          password: encodeURIComponent(form.password),
        })
        console.log(res)
        if (res.code === 200) {
          //储存cookie，刷新页面
          // store.setProfile(res.profile)
          // store.setAccount(res.account)
          document.cookie = res.cookie
          setCookie('userId', res.profile.userId, 15)
          setTimeout(() => {
            window.location.reload()
          }, 300)
        } else {
          ElMessage.error('登录失败，' + res.msg)
        }
      } catch (error) {
        console.error(error)
      }
    }
    return {
      form,
      cancel,
      store,
      rules,
      toLogin,
      loginFormRef,
    }
  },
})
</script>
