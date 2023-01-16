<template lang="pug">
el-scrollbar
  el-menu(router unique-opened :default-active="route.path" :collapse="props.collapse")
    TherMenuItem(:routers="routers")
</template>

<script setup>
import TherMenuItem from './TheMenuItem.vue'

const props = defineProps({ collapse: Boolean, routers: Array })

const route = useRoute()

</script>

<script>
export default { name: 'the-menu' }
</script>