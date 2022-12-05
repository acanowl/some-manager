<template lang="pug">
el-form(:model="form" :rules="rules" label-width="0" size="large")
	el-form-item(prop="account")
		el-input(v-model="form.account" clearable placeholder="用户名 / 手机 / 邮箱")
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
		el-button.w-full(type="primary" :loading="islogin" round @click="login") 登录
	.flex
		.pr-sm 还没有账号?
		router-link(to="/register") 创建新账号
</template>

<script setup>
import { registerApi } from '@/api/'

defineOptions({ name: 'password-form' })

const rules = {
	account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const form = reactive({ account: 'admin', password: 'admin', autologin: false })

const islogin = ref(false)

const login = () => {
	console.log('点击登陆')
	registerApi(form)
		.then(res => {
			console.log(res)
		}).catch(err => {
			console.log(err)
		})
}

</script>

<style lang="scss">
.password-form {}
</style>