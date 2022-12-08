<template lang="pug">
.flex.justify-between
  el-form.flex-1.pr-20px(v-if="formItem && formItem.length > 0" :inline="true" :model="formData" label-position="right")
    el-row
      el-col(v-for="(item, index) in formItem" :key="index" :xs="8" :sm="8" :md="8" :lg="6" :xl="6")
        el-form-item(:key="index" :label="item.label" :prop="item.value")
          //- 下拉
          el-select(v-if="item.type === 'select'" v-model="formData[item.value]" clearable placeholder="请选择")
            el-option(v-for="(option,i) in item.children" :key="i" :value="option.value" :label="option.label")
          //- 文本
          el-input(v-if="item.type === 'text'" v-model="formData[item.value]" clearable placeholder="请输入")
          //- 日期
          el-date-picker(v-if="item.type === 'daterange'" v-model="formData[item.value]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期")
  .flex-shrink-0
    el-button(type="primary" @click="searchForm") 查询
    el-button(@click="clearData") 重置
    slot
</template>

<script setup>
const { formData } = defineProps({
  // form查询项
  formItem: { type: Array, default: () => [] },
  // form查询数据
  formData: { type: Object, default: () => {} }
})
const emits = defineEmits(['searchForm', 'clearForm'])

const searchForm = () => emits('searchForm', formData)

// 清空搜索栏
const clearData = () => {
  Object.keys(formData).forEach(key => (formData[key] = ''))
  emits('clearForm')
}
</script>

<script>
export default { name: 'form-search' }
</script>