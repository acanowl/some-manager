<template lang="pug">
.flex.justify-between
  the-form.flex-1.pr-20px(ref="formSeachRef" :formItem="filterFormItem" v-model:formData="state.form" :colSpan="colSpan" :labelWidth="labelWidth" :noPd="true")
  .flex-shrink-0
    .inline-block.pl-10px
      el-button(type="primary" @click="searchForm") 查询
    .inline-block.pl-10px
      el-button(@click="clearData") 重置
    slot
</template>

<script setup>
import { clone } from '@/utils/tool'

const formSeachRef = ref(null)

const props = defineProps({
  // 表单
  formItem: { type: Array, default: () => [] },
  // 表单数据
  formData: { type: Object, default: () => { } },
  colSpan: { type: Number, default: 0 },
  labelWidth: { type: String, default: 'auto' }
})

const state = reactive({ form: {} })
state.form = clone(props.formData)

// 目前仅提供下拉 文本及日期筛选
const formTypeLimit = ['select', 'text', 'daterange']
const filterFormItem = computed(() => props.formItem.filter(item => formTypeLimit.includes(item.type)))

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