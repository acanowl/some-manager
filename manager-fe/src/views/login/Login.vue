<template lang="pug">
el-form(ref="loginRef" :model="form" :rules="rules" label-width="0" size="large")
  el-form-item(prop="account")
    el-input(v-model="form.account" clearable placeholder="请输入用户名" @keyup.enter.native="login(loginRef)")
      template(#prefix)
        i-ep-user
  el-form-item(prop="password")
    el-input(v-model="form.password" clearable show-password placeholder="请输入密码" @keyup.enter.native="login(loginRef)")
      template(#prefix)
        i-ep-lock
  el-form-item
    el-col.text-right
      el-link(:underline="false" type="primary" @click="forgotPasswordHandle") 忘记密码？
      //- router-link(to="/reset-password") 忘记密码？
  el-form-item
    el-button.w-full(type="primary" round @click="login(loginRef)") 登录
</template>
  
<script setup>
import { loginApi } from '@/api/'
// import { formRules } from '@/utils/config'
import { resultFn } from '@/utils/tool'
import { formValidate } from '@/utils/valid'
import { useUserStore } from '@/store/modules/user'
import { setToken, setAuthed } from '@/utils/auth'

const form = reactive({ account: '', password: '' })
const rules = {
  account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  // password: formRules('passwordRequired')
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const userStore = useUserStore()
const router = useRouter()

const loginRef = ref()
// 登陆
const login = async formEl => {
  if (!formEl) return

  const valid = await formValidate(formEl)

  if (valid) {
    try {
      const res = await loginApi(form)
      console.log(res, 'success login')
      const { isSuccess } = resultFn(res)
      if (isSuccess) {
        const { data: { user, token } } = res
        userStore.setUserInfo(user)

        setToken(token)
        setAuthed()

        router.replace('/dashboard')
      }
    } catch (error) {
      console.log('error submit!', error)
    }
  }
}

const forgotPasswordHandle = async () => {
  try {
    const { value } = await ElMessageBox.prompt('', '请输入忘记密码的账户', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      inputErrorMessage: '请输入账户',
    })
    if (value) {
      // const res = await goodsUpdateCountApi({ num: value, id, type })
      // const { isSuccess } = resultFn(res)
    }
  } catch (error) {
    error.msg && ElNotification({ message: error.msg, type: 'error' })
    console.log('error count change!', error)
  }
}
</script>
  
<style lang="scss">
.password-form {}
</style>