<template lang="pug">
.goods 
  form-search(:form-item="formItem" :form-data="formData" @searchForm="getList")
    el-button(type="primary" @click="onAddClick") 新增
</template>

<script setup>
const formItem = [
  { label: '书名', value: 'name', type: 'text' },
  { label: '作者', value: 'author', type: 'text' },
  {
    label: '类型', value: 'type', type: 'select',
    children: [
      { label: '小说', value: '0' },
      { label: '文学', value: '1' },
      { label: '科技', value: '2' },
      { label: '经济', value: '3' },
      { label: '法律', value: '4' },
      { label: '历史', value: '5' },
      { label: '哲学', value: '6' },
      { label: '艺术', value: '7' }
    ]
  }
]
const formData = reactive({ name: '', author: '', type: '' })

const getList = val => {
  console.log('查询数据', val)
}

const onAddClick = () => {
  console.log('新增数据')
}

</script>

<style lang="scss">

</style>
