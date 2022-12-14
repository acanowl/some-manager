<template lang="pug">
el-form(ref="loginRef" :model="form" :rules="rules" label-width="0" size="large")
  el-form-item(prop="account")
    el-input(v-model="form.account" clearable placeholder="请输入用户名")
      template(#prefix)
        i-ep-user
  el-form-item(prop="password")
    el-input(v-model="form.password" clearable show-password placeholder="请输入密码")
      template(#prefix)
        i-ep-lock
  el-form-item
    el-col(:span="12")
      el-checkbox(label="24小时免登录" v-model="form.autologin")
    el-col.text-right(:span="12")
      router-link(to="/reset-password") 忘记密码？
  el-form-item
    el-button.w-full(type="primary" round @click="login(loginRef)") 登录
</template>
  
<script setup>
import { loginApi } from '@/api/'
// import { formRules } from '@/utils/config'
import { formValidate } from '@/utils/valid'

const form = reactive({ account: 'admin', password: '123456', autologin: false })
const rules = {
  account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  // password: formRules('passwordRequired')
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const loginRef = ref()
// 登陆
const login = async formEl => {
  if (!formEl) return

  const valid = await formValidate(formEl)

  if (valid) {
    try {
      const res = await loginApi(form)
      console.log(res, 'success login')
      const { msg: message = '', code } = res || {}
      // FIXME 暂时处理
      ElNotification({ message, type: code === -1 ? 'error' : 'success' })
    } catch (error) {
      console.log('error submit!', error)
    }
  }
}
</script>
  
<style lang="scss">
.password-form {}
</style>