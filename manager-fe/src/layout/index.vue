<template lang="pug">
header.layout-header.flex.justify-between.h-58px.bg-deep-green.px-20px
  .flex-center
    img.pr-10px(width="58" :src="logoImage")
    .text-2xl.font-bold.color-white {{ systemName }}
  .flex-center
    dark-mode
    .color-white.flex-center 
      .px-12px 您好，{{ userStore.userInfo.account }}
      el-link(type="primary" @click="logoutHandle") 退出
section.layout-section.flex.flex-1.of-auto
  .layout-side.flex-col.flex-shrink-0.bg-white.w-260px(:class="{ 'w-65px': isMenuCollapse }")
    .flex-1.of-auto.of-x-hidden
      the-menu(:collapse="isMenuCollapse" :routers="routers")
    .layout-collapse.h-50px.flex-center.cursor-pointer(@click="isMenuCollapse = !isMenuCollapse")
      i-ep-expand(v-if="isMenuCollapse")
      i-ep-fold(v-else)
  .flex-1.flex-col.full-h.of-auto
    top-bar
    .of-auto.flex-1.flex
      .layout-main.of-auto.flex-1.flex-col.p-20px.min-w-732px
        router-view(v-slot="{ Component, route }")
          component(:is="Component" :key="route.fullPath")
</template>

<script setup>
import TheMenu from './components/TheMenu.vue'
import TopBar from './components/TopBar.vue'
// logo图片
import { getImageUrl } from '@/utils/tool'
import { removeToken, removeAuthed } from '@/utils/auth'

import { useUserStore } from '@/store/modules/user'
import { useCharacterStore } from '@/store/modules/character'

const userStore = useUserStore()
const characterStore = useCharacterStore()
// 获取角色
characterStore.setCharacterList()
// 获取路由
const routers = computed(() => userStore.getRouters.filter(item => !item.meta?.hidden))

const logoImage = getImageUrl('library-icon')
// 系统名称
const systemName = '图书馆信息管理系统'
// 菜单是否收起
const isMenuCollapse = ref(false)

const logoutHandle = () => {
  window.location.reload()
  localStorage.clear()
  removeToken()
  removeAuthed()
}
</script>

<script>
export default { name: 'the-layout' }
</script>

<style lang="scss">
.layout-section {
  .layout-side {
    border-right: 1px solid $color-mute;
    transition: width 0.3s;

    .layout-collapse {
      border-top: 1px solid $color-mute;
    }
  }

  .layout-main {
    background-color: #fcfcfc;
  }
}
</style>
  