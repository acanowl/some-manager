<template lang="pug">
el-form.register(ref="registerRef" :model="form" :rules="rules" label-width="0" size="large")
  el-form-item(prop="account")
    el-input(v-model="form.account" clearable placeholder="请输入用户名")
      template(#prefix)
        i-ep-user
  el-form-item(prop="password")
    el-input(v-model="form.password" clearable show-password placeholder="请输入密码")
      template(#prefix)
        i-ep-lock
  el-form-item
    el-button.w-full(type="primary" round @click="register(registerRef)") 注册
</template>
  
<script setup>
import { registerApi } from '@/api/'
import { formValidate } from '@/utils/valid'

const form = reactive({ account: '', password: '' })
const rules = {
  account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const registerRef = ref()
// 注册
const register = async formEl => {
  if (!formEl) return
  const valid = await formValidate(formEl)
  if (valid) {
    try {
      const res = await registerApi(form)
      console.log(res, 'success register')
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
.register {}
</style>