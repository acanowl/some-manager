<template lang="pug">
el-button(circle type="info" @click="toggleDark()")
  template(#icon)
    i-ep-sunny(v-if="isDark")
    i-ep-moon(v-else)
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)

defineOptions({ name: 'dark-mode' })
</script>