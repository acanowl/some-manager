<template lang="pug">
el-card.users.flex-1(shadow="never" :body-style="{ height: '100%' }")
  form-search(:formItem="fromSearchItem" :formData="formData" :colSpan="12" @searchForm="getList")
    el-button(type="primary" @click="addHandle") 新增
  the-table.pt-20px(ref="userTableRef" :requestApi="userListApi" :column="tableColumn" :innerPadding="cptInnerPadding")
    template(#operation="{ row }")
      .flex
        .pr-10px
          el-link(@click="showDetialHandle(row)") 查看
        .pr-10px
          el-link(type="primary" @click="updateHandle(row)") 编辑
        .pr-10px
          el-link(type="primary" @click="resetPasswordHandle(row)") 重置密码
        el-link(type="danger" @click="deleteHandle(row)") 删除
form-operation(ref="userSaveRef" :formItem="formItem" :formData="formData" @submitForm="submitHandle" @closed="closedHandle")
</template>
  
<script setup>
import { useDateFormat } from '@vueuse/core'
import { resultFn } from '@/utils/tool'
import { userAddApi, userUpdateApi, userListApi, userDeleteApi, userResetPasswordApi } from '@/api'

const userTableRef = ref(null)
const userSaveRef = ref(null)

const cptInnerPadding = computed(() => 'var(--el-card-padding) * 2')

const OPERATION_FORM_TYPE = { ADD: 'add', EDIT: 'edit', SHOW: 'show' }

let isAdd = ref(false)

const fromSearchItem = [
  { label: '账号', prop: 'account', type: 'text' },
]

const formItem = computed(() => [
  { label: '账号', prop: 'account', type: 'text' },
  ...(isAdd.value ? [{ label: '密码', prop: 'password', type: 'text' }] : []),
  { label: '角色', prop: 'roles', type: 'select', children: [] },
])

const formData = reactive({ account: '', password: '', roles: '' })

const tableColumn = [
  {
    prop: 'account',
    label: '账号',
    sortable: false,
    fixed: false,
    showOverflowTooltip: true
  },
  {
    prop: 'roles',
    label: '角色',
    format: val => val
  },
  {
    prop: 'meta.createdAt',
    label: '加入时间',
    format: val => useDateFormat(val, 'YYYY-MM-DD HH:mm:ss').value
  },
  {
    prop: 'operation',
    label: '操作'
  }
]

const getList = val => {
  console.log('查询数据', val)
  userTableRef.value.reload(val)
}

const addHandle = () => {
  isAdd.value = true
  userSaveRef.value.show(OPERATION_FORM_TYPE.ADD)
}
const submitHandle = async (data, type) => {
  const httpRequestApi = {
    [OPERATION_FORM_TYPE.ADD]: userAddApi,
    [OPERATION_FORM_TYPE.EDIT]: userUpdateApi
  }[type]

  if (!httpRequestApi) return
  isAdd.value = false
  try {
    const res = await httpRequestApi(data)
    const { isSuccess } = resultFn(res)
    isSuccess && userTableRef.value.refresh()
  } catch (error) {
    error.msg && ElNotification({ message: error.msg, type: 'error' })
    console.log('error add!', error)
  }
}
const closedHandle = () => {
  isAdd.value = false
}

const showDetialHandle = row => {
  userSaveRef.value.show(OPERATION_FORM_TYPE.SHOW).setData(row)
}
const updateHandle = row => {
  userSaveRef.value.show(OPERATION_FORM_TYPE.EDIT).setData(row)
}

const resetPasswordHandle = async row => {
  const { _id: id, account } = row
  try {
    await ElMessageBox.confirm(`是否要重置 ${account} 密码 ?`, '温馨提示', { confirmButtonText: 'OK', center: true, cancelButtonText: 'Cancel' })
    const res = await userResetPasswordApi({ id })
    resultFn(res)
  } catch (error) {
    error.msg && ElNotification({ message: error.msg, type: 'error' })
    console.log('error delete!', error)
  }
}

const deleteHandle = async row => {
  const { _id: id, account } = row
  try {
    await ElMessageBox.confirm(`是否要删除 ${account} ?`, '温馨提示', { confirmButtonText: 'OK', center: true, cancelButtonText: 'Cancel' })
    const res = await userDeleteApi({ id })
    const { isSuccess } = resultFn(res)
    isSuccess && userTableRef.value.refresh()
  } catch (error) {
    error.msg && ElNotification({ message: error.msg, type: 'error' })
    console.log('error delete!', error)
  }
}
</script>
  
<script>
export default { name: 'users' }
</script>
