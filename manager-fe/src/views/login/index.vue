<template lang="pug">
.full.flex-col
  el-header.flex.items-center.justify-end
    dark-mode
  .flex-1.flex-col.mx-auto.pt-180px.w-340px
    .text-3xl.font-bold.pb-40px 欢迎登录
    el-tabs
      el-tab-pane.pb-sm(label="账号登陆" lazy)
        password-form
      el-tab-pane.pb-sm(label="手机号登陆" lazy) 手机号登陆
</template>

<script setup>
import passwordForm from './components/PasswordForm/index.vue'

defineOptions({ name: 'page-login' })

</script>

<style lang="scss">

</style>
