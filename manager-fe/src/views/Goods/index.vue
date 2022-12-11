<template lang="pug">
el-card.goods.flex-1(shadow="never" :body-style="{ height: '100%' }")
  form-search(:form-item="formItem" :form-data="formData" @searchForm="getList")
    el-button(type="primary" @click="onAddClick") 新增
  the-table.pt-20px(ref="goodsTableRef" :data="tableData" :column="tableColumn" :innerPadding="cptInnerPadding")
</template>

<script setup>
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
  {
    prop: 'id',
    label: 'ID',
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
    prop: 'name',
    label: '名字',
    // width: '120',
    sortable: false,
    fixed: false,
    showOverflowTooltip: false
  },
  {
    prop: 'address',
    label: '地址',
    // width: '120',
    sortable: false,
    fixed: false,
    showOverflowTooltip: false
  },
]

let tableData = reactive([
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  }
])

const getList = val => {
  console.log('查询数据', val)
}

const onAddClick = () => {
  console.log('新增数据')
}

</script>

<style lang="scss">

</style>
