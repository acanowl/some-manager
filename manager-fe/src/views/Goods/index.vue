<template lang="pug">
el-card.goods.flex-1(shadow="never" :body-style="{ height: '100%' }")
  form-search(:formItem="formItem" :formData="formData" @searchForm="getList")
    el-button(type="primary" @click="onAddClick") 新增
  the-table.pt-20px(ref="goodsTableRef" :requestApi="goodsListApi" :column="tableColumn" :innerPadding="cptInnerPadding")
form-operation(ref="goodsAddRef" :formItem="formItem" :formData="formData" @submitForm="submitHandle")
</template>

<script setup>
import { goodsListApi } from '@/api'

const goodsTableRef = ref(null)
const goodsAddRef = ref(null)

const cptInnerPadding = computed(() => 'var(--el-card-padding) * 2')

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
const formData = reactive({ name: '', author: '', type: '', daterange: '' })

const tableColumn = [
  {
    prop: 'name',
    label: '名字',
    sortable: false,
    fixed: false,
    showOverflowTooltip: false
  },
  {
    prop: 'date',
    label: '时间',
    sortable: false,
    fixed: false,
    showOverflowTooltip: false
  },
  {
    prop: 'price',
    label: '价格',
    sortable: false,
    fixed: false,
    showOverflowTooltip: false
  },
]

const getList = val => {
  console.log('查询数据', val)
  goodsTableRef.value.refresh()
}

const onAddClick = () => {
  console.log('新增数据')
  goodsAddRef.value.show('add')
}

const submitHandle = data => {
  console.log(data, 'xx')
}

</script>

<style lang="scss">

</style>
