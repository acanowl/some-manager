<template lang="pug">
.full.flex-col
  el-header.flex.items-center.justify-end
    dark-mode
  .flex-1.flex-col.mx-auto.pt-160px.w-340px
    .text-3xl.font-bold.pb-40px 欢迎登录
    el-tabs
      el-tab-pane.pt-sm(label="账号登陆" lazy)
        login-form
      el-tab-pane.pt-sm(label="注册" lazy)
        register-form
</template>

<script setup>
import LoginForm from './Login.vue'
import RegisterForm from './Register.vue'
</script>
