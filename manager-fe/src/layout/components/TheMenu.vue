<template lang="pug">
el-scrollbar
  el-menu(router unique-opened :default-active="route.path" :collapse="props.collapse")
    div(v-for="item in routers" :key="item.name")
      template(v-if="!item['hidden']")
        el-sub-menu(v-if="item.children && item.children.length" :index="concatPath(item.path)")
          template(#title)
            el-icon(:size="20")
              component(:is="item.meta.icon")
            span {{ item.meta.title }}
          div(v-for="sub in item.children" :key="sub.name")
            el-menu-item(:index="concatPath(item.path, sub.path)")
              el-icon(:size="20")
                component(:is="item.meta.icon")
                  span {{ item.meta.title }}
              template(#title) {{ item.meta.title }}
        el-menu-item(v-else :index="concatPath(item.path)")
          el-icon(:size="20")
            component(:is="item.meta.icon")
              span {{ item.meta.title }}
          template(#title) {{ item.meta.title }}
</template>

<script setup>
import { useUserStore } from '@/store/modules/user'

const props = defineProps({ collapse: Boolean })

const userStore = useUserStore()
const routers = computed(() => userStore.getRouters)
const route = useRoute()

const concatPath = (p, c = '') =>
  `${p !== '' ? '/' + p : '/'}${c !== '' ? '/' + c : ''}`

</script>

<script>
export default { name: 'the-menu' }
</script>