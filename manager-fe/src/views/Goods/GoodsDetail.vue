<template lang="pug">
el-card.goods-detail.flex-col(shadow="never")
  template(#header)
    .flex.justify-between.items-center
      .text-2xl.font-bold {{ row.name }}
      .flex
        .pl-10px
          el-button(@click="rebackHandle") 返回
        .pl-10px(v-auth="ROLE_SA")
          el-button.pr-10px(@click="updateHandle(row)") 编辑
        .pl-10px(v-auth="ROLE_SA")
          el-button(type="danger" @click="deleteHandle(row)") 删除
  el-row
    el-col(v-for="(item, index) in formItem" :key="index" :xs="12" :sm="12" :md="8" :lg="8" :xl="8")
      el-row.pb-10px
        el-col.font-bold(:span="6") {{ item.label }}
        el-col(:span="16") {{ formatData(item.prop) }}
el-card.mt-10px.flex-1.flex-col(shadow="never" :body-style="{ flex: 1 }")
  template(#header)
    .flex.justify-between.items-center
      .text-lg.font-bold 库存变成记录
      .flex
        .pr-10px
          el-link(type="primary" @click="updateLogHandle(UPDATE_COUNT_TYPE.IN)")
            i-ep-check(v-if="cptIsIn")
            .pl-4px 入库日志
        el-link(type="primary" @click="updateLogHandle(UPDATE_COUNT_TYPE.OUT)") 
          i-ep-check(v-if="!cptIsIn")
          .pl-4px 出库日志
  the-table(ref="inventoryLogTableRef" :requestApi="goodsInventoryLogApi" :column="inventoryLogTableColumn" :innerPadding="cptInnerPadding")
form-operation(ref="goodsSaveRef" :formItem="formItem" :formData="formData" @submitForm="submitHandle")
</template>
  
<script setup>
import { ROLE_SA } from '@/config'
import { useDateFormat } from '@vueuse/core'
import { resultFn } from '@/utils/tool'
import { goodsAddApi, goodsDeleteApi, goodsUpdateApi, goodsDetailApi, goodsInventoryLogApi } from '@/api'

const router = useRouter()

const UPDATE_COUNT_TYPE = { IN: 1, OUT: 0 }
const OPERATION_FORM_TYPE = { ADD: 'add', EDIT: 'edit' }

const goodsSaveRef = ref(null)
const inventoryLogTableRef = ref(null)

const cptInnerPadding = computed(() => 'var(--el-card-padding)')

const curId = ref('')
const row = ref({})

const logType = ref(`${UPDATE_COUNT_TYPE.IN}`)
const cptIsIn = computed(() => Number(logType.value) === UPDATE_COUNT_TYPE.IN)

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
  { label: '书名', prop: 'name', type: 'text' },
  { label: '作者', prop: 'author', type: 'text' },
  { label: '出版日期', prop: 'date', type: 'date' },
  { label: '类型', prop: 'classfiy', type: 'select', children: classfiyMap },
  { label: '价格', prop: 'price', type: 'number' },
  { label: '库存', prop: 'count', type: 'number' }
]
const formData = reactive({ name: '', author: '', date: '', classfiy: '' })

const inventoryLogTableColumn = [
  {
    prop: 'num',
    label: '数量',
    sortable: false,
    fixed: false,
    showOverflowTooltip: true
  },
  {
    prop: 'meta.createdAt',
    label: '时间',
    format: val => useDateFormat(val, 'YYYY-MM-DD HH:mm:ss').value
  }
]

const formatData = prop => {
  if (prop === 'classfiy') {
    let itemValue = row.value[prop]
    return classfiyMap.filter(item => item.value == itemValue)[0]?.label
  }
  return row.value[prop]
}

const getData = async id => {
  id = id || curId.value
  try {
    const res = await goodsDetailApi({ id })
    // goods.row = res.data
    row.value = res.data
    console.log(row.value, 'res ')
    // isSuccess && 
  } catch (error) {
    error.msg && ElNotification({ message: error.msg, type: 'error' })
    console.log('error add!', error)
  }
}

const submitHandle = async (data, type) => {
  const httpRequestApi = {
    [OPERATION_FORM_TYPE.ADD]: goodsAddApi,
    [OPERATION_FORM_TYPE.EDIT]: goodsUpdateApi
  }[type]

  if (!httpRequestApi) return
  try {
    const res = await httpRequestApi(data)
    console.log(res, ' ??')
    const { isSuccess } = resultFn(res)
    isSuccess && getData()
  } catch (error) {
    error.msg && ElNotification({ message: error.msg, type: 'error' })
    console.log('error add!', error)
  }
}

const rebackHandle = () => {
  router.replace('/goods')
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
    isSuccess && rebackHandle()

  } catch (error) {
    error.msg && ElNotification({ message: error.msg, type: 'error' })
    console.log('error delete!', error)
  }
}

const updateLogHandle = type => {
  // TODO 移除customFormat方法，不合理，应由后台返回相关数据
  logType.value = `${type}`
}

onMounted(() => {
  const { id } = router.currentRoute.value.query
  curId.value = id
  getData()
})
</script>
