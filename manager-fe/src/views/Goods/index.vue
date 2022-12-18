<template lang="pug">
el-card.goods.flex-1(shadow="never" :body-style="{ height: '100%' }")
  form-search(:formItem="fromSearchItem" :formData="formData" @searchForm="getList")
    el-button(type="primary" @click="onAddClick") 新增
  the-table.pt-20px(ref="goodsTableRef" :requestApi="goodsListApi" :column="tableColumn" :innerPadding="cptInnerPadding")
    template(#count="{ row }")
      .flex
        el-link(type="primary" @click="countChangeHandle(UPDATE_COUNT_TYPE.IN, row)") 入库
        .px-10px {{ row.count }}
        el-link(type="primary" @click="countChangeHandle(UPDATE_COUNT_TYPE.OUT, row)") 出库
    template(#operation="{ row }")
      .flex
        .pr-10px
          el-link(@click="showDetialHandle(row)") 查看
        .pr-10px
          el-link(type="primary" @click="updateHandle(row)") 编辑
        el-link(type="danger" @click="deleteHandle(row)") 删除
form-operation(ref="goodsSaveRef" :formItem="formItem" :formData="formData" @submitForm="submitHandle")
</template>

<script setup>
import { resultFn } from '@/utils/tool'
import { goodsListApi, goodsAddApi, goodsDeleteApi, goodsUpdateApi, goodsUpdateCountApi } from '@/api'

const router = useRouter()

const goodsTableRef = ref(null)
const goodsSaveRef = ref(null)

const cptInnerPadding = computed(() => 'var(--el-card-padding) * 2')

const UPDATE_COUNT_TYPE = { IN: 1, OUT: 0 }
const OPERATION_FORM_TYPE = { ADD: 'add', EDIT: 'edit' }

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

const fromSearchItem = [
  { label: '书名', prop: 'name', type: 'text' },
  { label: '作者', prop: 'author', type: 'text' },
  { label: '类型', prop: 'classfiy', type: 'select', children: classfiyMap }
]

const formItem = [
  { label: '书名', prop: 'name', type: 'text' },
  { label: '作者', prop: 'author', type: 'text' },
  { label: '出版日期', prop: 'date', type: 'date' },
  { label: '类型', prop: 'classfiy', type: 'select', children: classfiyMap },
  { label: '价格', prop: 'price', type: 'number' },
  { label: '库存', prop: 'count', type: 'number' }
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
    prop: 'count',
    label: '库存'
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
  goodsSaveRef.value.show(OPERATION_FORM_TYPE.ADD)
}
const submitHandle = async (data, type) => {
  const httpRequestApi = {
    [OPERATION_FORM_TYPE.ADD]: goodsAddApi,
    [OPERATION_FORM_TYPE.EDIT]: goodsUpdateApi
  }[type]

  if (!httpRequestApi) return
  try {
    const res = await httpRequestApi(data)
    const { isSuccess } = resultFn(res)
    isSuccess && goodsTableRef.value.refresh()
  } catch (error) {
    error.msg && ElNotification({ message: error.msg, type: 'error' })
    console.log('error add!', error)
  }
}

const countChangeHandle = async (type, row) => {
  const { _id: id } = row
  const title = `请输入需要${type === UPDATE_COUNT_TYPE.IN ? '增加' : '减少'}库存数`
  try {
    const { value } = await ElMessageBox.prompt('', title, {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      inputPattern: /^([1-9]\d*|[0]{1,1})$/,
      inputErrorMessage: '请输入非负整数',
    })
    const res = await goodsUpdateCountApi({ num: value, id, type })
    const { isSuccess } = resultFn(res)
    isSuccess && goodsTableRef.value.refresh()
  } catch (error) {
    error.msg && ElNotification({ message: error.msg, type: 'error' })
    console.log('error count change!', error)
  }
}

const showDetialHandle = async row => {
  // goodsSaveRef.value.show('show').setData(row)
  router.push({ path: '/goods/detail', query: { id: row._id } })
}
const updateHandle = async row => {
  goodsSaveRef.value.show(OPERATION_FORM_TYPE.EDIT).setData(row)
}

const deleteHandle = async row => {
  const { _id: id, name } = row
  try {
    await ElMessageBox.confirm(`是否要删除 《${name}》 ?`, '温馨提示', { confirmButtonText: 'OK', center: true, cancelButtonText: 'Cancel' })
    const res = await goodsDeleteApi({ id })
    const { isSuccess } = resultFn(res)
    isSuccess && goodsTableRef.value.refresh()
  } catch (error) {
    error.msg && ElNotification({ message: error.msg, type: 'error' })
    console.log('error delete!', error)
  }
}

</script>

<script>
export default { name: 'goods' }
</script>

<style lang="scss">

</style>
