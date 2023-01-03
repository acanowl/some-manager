<template lang="pug">
el-scrollbar
  el-menu(router unique-opened :default-active="route.path" :collapse="props.collapse")
    template(v-for="item in routers" :key="item.name")
      el-sub-menu(v-if="item.children && item.children.length" :index="concatPath(item.path)")
        template(#title)
          el-icon
            component(:is="item.meta.icon")
          span {{ item.meta.title }}
        template(v-for="sub in item.children" :key="sub.name")
          el-menu-item(:index="concatPath(item.path, sub.path)")
            el-icon
              component(:is="item.meta.icon")
            template(#title) 
              span {{ item.meta.title }}
      el-menu-item(v-else :index="concatPath(item.path)")
        el-icon
          component(:is="item.meta.icon")
        template(#title)
          span {{ item.meta.title }}
</template>

<script setup>
import { useUserStore } from '@/store/modules/user'

const props = defineProps({ collapse: Boolean })

const userStore = useUserStore()
const routers = computed(() => userStore.getRouters.filter(item => !item.meta?.hidden))
const route = useRoute()

const concatPath = (p, c = '') =>
  `${p !== '' ? '/' + p : '/'}${c !== '' ? '/' + c : ''}`

</script>

<script>
export default { name: 'the-menu' }
</script>