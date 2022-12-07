<template lang="pug">
.layout-topbar.flex.justify-between.items-center.h-50px.bg-white
  el-breadcrumb.px-20px(:separator-icon="ArrowRight")
    el-breadcrumb-item(v-for="item in breadcrumbData" :key="item.title" :to="{ path: item.path }") {{ item.title }}
</template>
  
<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useAppStore } from '@/store/modules/app'
const userStore = useAppStore()
const breadcrumbData = computed(() => userStore.getBreadCrumb)
</script>

<script>
export default { name: 'top-bar' }
</script>
  
<style lang="scss">
.layout-topbar {
  border-bottom: 1px solid $color-mute;
  box-shadow: 0 1px 4px rgba($color: $color-deep-green, $alpha: 0.08);
}
</style>
    