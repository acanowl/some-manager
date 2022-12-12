<template lang="pug">
el-card.goods.flex-1(shadow="never" :body-style="{ height: '100%' }")
  form-search(:form-item="formItem" :form-data="formData" @searchForm="getList")
    el-button(type="primary" @click="onAddClick") 新增
  the-table.pt-20px(ref="goodsTableRef" :requestApi="goodsListApi" :column="tableColumn" :innerPadding="cptInnerPadding")
</template>

<script setup>
import { goodsListApi } from '@/api'

const goodsTableRef = ref(null)

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
const formData = reactive({ name: '', author: '', type: '' })

const tableColumn = [
  // {
  //   prop: 'id',
  //   label: 'ID',
  //   // width: '120',
  //   sortable: false,
  //   fixed: false,
  //   showOverflowTooltip: false
  // },
  {
    prop: 'name',
    label: '名字',
    // width: '120',
    sortable: false,
    fixed: false,
    showOverflowTooltip: false
  },
  {
    prop: 'date',
    label: '时间',
    // width: '120',
    sortable: false,
    fixed: false,
    showOverflowTooltip: false
  },
  {
    prop: 'price',
    label: '价格',
    // width: '120',
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
}

</script>

<style lang="scss">

</style>
