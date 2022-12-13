<template lang="pug">
.flex.justify-between
  the-form.flex-1.pr-20px(ref="formSeachRef" :formItem="filterFormItem" v-model:formData="state.form" :noPd="true")
  .flex-shrink-0
    el-button(type="primary" @click="searchForm") 查询
    el-button(@click="clearData") 重置
    slot
</template>

<script setup>
import { clone } from '@/utils/tool'

const formSeachRef = ref(null)

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
const filterFormItem = computed(() => formItem.filter(item => formTypeLimit.includes(item.type)))

const emits = defineEmits(['searchForm', 'clearForm'])

const searchForm = () => emits('searchForm', state.form)

// 清空搜索栏
const clearData = () => {
  formSeachRef.value.resetFields()
  emits('clearForm')
}
</script>

<script>
export default { name: 'form-search' }
</script>