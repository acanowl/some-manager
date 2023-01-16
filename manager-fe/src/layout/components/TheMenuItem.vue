<template lang="pug">
template(v-for="item in routers" :key="item.name")
  el-sub-menu(v-if="item.children && item.children.length" :index="concatPath(item.path)")
    template(#title)
      el-icon
        component(:is="item.meta.icon")
      span {{ item.meta.title }}
    TheMenuItem(:routers="item.children" :parentRouter="item")
  el-menu-item(v-else :index="concatPath(item.path)")
    el-icon
      component(:is="item.meta.icon")
    template(#title)
      span {{ item.meta.title }}
</template>

<script setup>

const props = defineProps({ routers: Array, parentRouter: Object })

const concatPath = (p, c = props.parentRouter?.path) => `${c ? '/' + c : ''}${p ? '/' + p : '/'}`

</script>

<script>
export default { name: 'the-menu-item' }
</script>