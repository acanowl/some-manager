<template lang="pug">
.full.flex-col
  el-header.flex.items-center.justify-end
    dark-mode
  .flex-1.flex-col.mx-auto.pt-180px.w-340px
    .text-3xl.font-bold.pb-40px 欢迎登录
    el-tabs
      el-tab-pane(label="账号登陆" lazy)
        | 账号登陆
      el-tab-pane(label="手机号登陆" lazy)
        | 手机号登陆
</template>
<!-- <template>
  <div class="login-wrapper">
    <div class="login">
      <el-card class="login-center">
        <template #header>
          <div class="card_header" @click="toggleDark()">
            <span>欢迎登录</span>
          </div>
        </template>
        <el-form ref="loginFormRef" :model="loginFormState" :rules="rules">
          <el-form-item prop="name">
            <el-input v-model.trim="loginFormState.name" prefix-icon="el-icon-user-solid" maxlength="32"
              placeholder="请输入账号" clearable />
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input v-model.trim="loginFormState.pwd" prefix-icon="el-icon-lock" maxlength="16" show-password
              placeholder="请输入密码" clearable @keyup.enter.exact="handleLogin" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" :loading="loginFormState.loading" @click="handleLogin"> 登 录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template> -->

<script setup name="page-login">
import { useRouter } from 'vue-router'
import { encode } from 'js-base64'
import { setToken, setAuthed } from '@/utils/auth'
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const userStore = useUserStore()
const loginFormRef = ref()
const loginFormState = reactive({
  name: 'admin',
  pwd: '123456',
  loading: false
})
const rules = {
  name: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
  pwd: [
    { required: true, message: '密码不能为空', trigger: 'blur' }
  ]
}
const handleLogin = () => {
  loginFormRef.value.validate(valid => {
    if (!valid) {
      return false
    }
    loginFormState.loading = true
    const params = { name: loginFormState.name, pwd: loginFormState.pwd }
    setTimeout(() => {
      const users = { role: loginFormState.name === 'admin' ? 'admin' : '', username: loginFormState.name }
      Object.assign(params, users)
      sessionStorage.setItem('jwt', encode(JSON.stringify(params)))
      userStore.setUserInfo(params)
      loginFormState.loading = false
      setToken('Bearer')
      setAuthed()
      router.push({ path: '/' })
    }, 1000)
  })
}
</script>

<style lang="scss">

</style>
