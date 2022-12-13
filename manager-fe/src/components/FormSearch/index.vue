<template lang="pug">
.flex.justify-between
  the-form.flex-1.pr-20px(:formItem="filterFormItem" :formData="state.form" :noPd="true" @change="changeHandle")
  .flex-shrink-0
    el-button(type="primary" @click="searchForm") 查询
    el-button(@click="clearData") 重置
    slot
</template>

<script setup>
import { clone } from '@/utils/tool'

const { formItem, formData } = defineProps({
  // 表单
  formItem: { type: Array, default: () => [] },
  // 表单数据
  formData: { type: Object, default: () => { } }
})

const state = reactive({ form: {} })
state.form = clone(formData)

// 目前仅提供下拉 文本及日期筛选
const formTypeLimit = ['select', 'text', 'daterange']
const filterFormItem = formItem.filter(item => formTypeLimit.includes(item.type))

const emits = defineEmits(['searchForm', 'clearForm'])

const searchForm = () => emits('searchForm', state.form)

// FIXME 修改为v-model:formData的形式
const changeHandle = (data, val) => {
  state.form = clone(data)
}

// 清空搜索栏
const clearData = () => {
  Object.keys(state.form).forEach(key => (state.form[key] = ''))
  emits('clearForm')
}
</script>

<script>
export default { name: 'form-search' }
</script>