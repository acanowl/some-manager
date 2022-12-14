<template lang="pug">
el-card.goods.flex-1(shadow="never" :body-style="{ height: '100%' }")
  form-search(:formItem="formItem" :formData="formData" @searchForm="getList")
    el-button(type="primary" @click="onAddClick") 新增
  the-table.pt-20px(ref="goodsTableRef" :requestApi="goodsListApi" :column="tableColumn" :innerPadding="cptInnerPadding")
    template(#operation="{ row }")
      el-link(type="primary" @click="deleteHandle(row)") 删除
form-operation(ref="goodsAddRef" :formItem="formItem" :formData="formData" @submitForm="submitHandle")
</template>

<script setup>
// , goodsUpdateApi // 编辑
import { goodsListApi, goodsAddApi, goodsDeleteApi } from '@/api'

const goodsTableRef = ref(null)
const goodsAddRef = ref(null)

const cptInnerPadding = computed(() => 'var(--el-card-padding) * 2')

const classfiyMap = [
  { label: '小说', value: '0' },
  { label: '文学', value: '1' },
  { label: '科技', value: '2' },
  { label: '经济', value: '3' },
  { label: '法律', value: '4' },
  { label: '历史', value: '5' },
  { label: '哲学', value: '6' },
  { label: '艺术', value: '7' }
]

const formItem = [
  // name, date, classfiy, price
  { label: '书名', prop: 'name', type: 'text' },
  { label: '作者', prop: 'author', type: 'text' },
  { label: '出版日期', prop: 'date', type: 'date' },
  {
    label: '类型', prop: 'classfiy', type: 'select',
    children: classfiyMap
  }
]
const formData = reactive({ name: '', author: '', date: '', classfiy: '' })

const tableColumn = [
  {
    prop: 'name',
    label: '名字',
    sortable: false,
    fixed: false,
    showOverflowTooltip: true
  },
  {
    prop: 'author',
    label: '作者',
    showOverflowTooltip: true
  },
  {
    prop: 'date',
    label: '出版日期'
  },
  {
    prop: 'classfiy',
    label: '类型',
    format: val => classfiyMap.filter(item => item.value == val)[0]?.label
  },
  {
    prop: 'price',
    label: '价格'
  },
  {
    prop: 'operation',
    label: '操作'
  }
]

const getList = val => {
  console.log('查询数据', val)
  goodsTableRef.value.reload(val)
}

const onAddClick = () => {
  goodsAddRef.value.show('add')
}
const submitHandle = async data => {
  try {
    const res = await goodsAddApi(data)
    const { msg: message = '', code } = res || {}
    const isSuccess = code !== -1
    ElNotification({ message, type: isSuccess ? 'success' : 'error' })
    isSuccess && goodsTableRef.value.refresh()
  } catch (error) {
    console.log('error add!', error)
  }
}

const deleteHandle = async row => {
  const { _id: id, name } = row
  try {
    await ElMessageBox.confirm(`是否要删除 《${name}》 ?`, '温馨提示', { confirmButtonText: 'OK', center: true, cancelButtonText: 'Cancel' })
    const res = await goodsDeleteApi({ id })
    const { msg: message = '', code } = res || {}
    const isSuccess = code !== -1
    ElNotification({ message, type: isSuccess ? 'success' : 'error' })
    isSuccess && goodsTableRef.value.refresh()
  } catch (error) {
    console.log('error delete!', error)
  }
}

</script>

<style lang="scss">

</style>
