<template lang="pug">
template(v-for="item in routers" :key="item.name")
  el-sub-menu(v-if="item.children && item.children.length" :index="resolvePath(item.path)")
    template(#title)
      el-icon
        component(:is="item.meta.icon")
      span {{ item.meta.title }}
    TheMenuItem(:routers="item.children" :basePath="resolvePath(item.path)")
  el-menu-item(v-else :index="resolvePath(item.path)")
    el-icon
      component(:is="item.meta.icon")
    template(#title)
      span {{ item.meta.title }}
</template>

<script setup>
import { isExternal } from '@/utils/valid'
import { getNormalPath } from '@/utils/tool'

const props = defineProps({ routers: Array, basePath: { type: String, default: '' } })

const resolvePath = routePath => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return getNormalPath(props.basePath + '/' + routePath)
}

</script>

<script>
export default { name: 'the-menu-item' }
</script>