<template lang="pug">
el-card.goods-classify.flex-1(shadow="never" :body-style="{ height: '100%' }")
  form-search(:formItem="fromSearchItem" :formData="formData" :colSpan="12" @searchForm="getList")
    .pl-10px.inline-block
      el-button(type="primary" @click="addHandle") 新增
  the-table.pt-20px(ref="goodsClassifyTableRef" :requestApi="goodsClassifyListApi" :column="tableColumn" :innerPadding="cptInnerPadding")
    template(#operation="{ row }")
      .pr-10px.inline-block
        el-link(@click="showDetialHandle(row)") 查看
      .pr-10px.inline-block
        el-link(type="primary" @click="updateHandle(row)") 编辑
      .pr-10px.inline-block
        el-link(type="danger" @click="deleteHandle(row)") 删除
form-operation(ref="goodsClassifySaveRef" :formItem="formItem" :formData="formData" @submitForm="submitHandle")
</template>
  
<script setup>
import { resultFn } from '@/utils/tool'
import {
  goodsClassifyAddApi,
  goodsClassifyUpdateApi,
  goodsClassifyListApi,
  goodsClassifyDeleteApi
} from '@/api'

const goodsClassifyTableRef = ref(null)
const goodsClassifySaveRef = ref(null)

const cptInnerPadding = computed(() => 'var(--el-card-padding) * 2')

const OPERATION_FORM_TYPE = { ADD: 'add', EDIT: 'edit', SHOW: 'show' }

// 角色表单列表
const formCharacterList = [{ label: '已激活', value: '1' }, { label: '未激活', value: '0' }]

const fromSearchItem = [
  { label: '状态', prop: 'status', type: 'select', children: formCharacterList },
]
const formItem = [
  { label: '类型', prop: 'label', type: 'text' },
  ...fromSearchItem
]

const formData = reactive({ label: '', status: '' })

const tableColumn = [
  {
    prop: 'label',
    label: '类型',
    sortable: false,
    fixed: false,
    showOverflowTooltip: true
  },
  {
    prop: 'status',
    label: '状态',
    format: val => formCharacterList.find(item => item.value === val)?.label || '未知'
  },
  {
    prop: 'operation',
    label: '操作'
  }
]

const getList = val => {
  console.log('查询数据', val)
  goodsClassifyTableRef.value.reload(val)
}

const addHandle = () => {
  goodsClassifySaveRef.value.show(OPERATION_FORM_TYPE.ADD)
}
const submitHandle = async (data, type) => {
  const httpRequestApi = {
    [OPERATION_FORM_TYPE.ADD]: goodsClassifyAddApi,
    [OPERATION_FORM_TYPE.EDIT]: goodsClassifyUpdateApi
  }[type]

  if (!httpRequestApi) return
  try {
    const res = await httpRequestApi(data)
    const { isSuccess } = resultFn(res)
    isSuccess && goodsClassifyTableRef.value.refresh()
  } catch (error) {
    error.msg && ElNotification({ message: error.msg, type: 'error' })
    console.log('error add!', error)
  }
}

const showDetialHandle = row => {
  goodsClassifySaveRef.value.show(OPERATION_FORM_TYPE.SHOW).setData(row)
}
const updateHandle = row => {
  goodsClassifySaveRef.value.show(OPERATION_FORM_TYPE.EDIT).setData(row)
}

const deleteHandle = async row => {
  const { id, label } = row
  try {
    await ElMessageBox.confirm(`是否要删除 ${label} ?`, '温馨提示', { confirmButtonText: 'OK', center: true, cancelButtonText: 'Cancel' })
    const res = await goodsClassifyDeleteApi({ id })
    const { isSuccess } = resultFn(res)
    isSuccess && goodsClassifyTableRef.value.refresh()
  } catch (error) {
    error.msg && ElNotification({ message: error.msg, type: 'error' })
    console.log('error delete!', error)
  }
}
</script>
  
<script>
export default { name: 'goods-classify' }
</script>
