<template lang="pug">
el-card.reset-password.flex-1(shadow="never" :body-style="{ height: '100%' }")
  the-table(ref="systemListTableRef" :requestApi="resetPasswordListApi" :column="tableColumn" :innerPadding="cptInnerPadding")
    template(#operation="{ row }")
      .pr-10px.inline-block
        el-link(type="primary" @click="resetHandle(row)") 重置
      .pr-10px.inline-block
        el-link(type="danger" @click="ignoreHandle(row)") 忽略
</template>
  
<script setup>
import { resultFn } from '@/utils/tool'
import { resetPasswordListApi, changeAccountStatusApi } from '@/api'

const systemListTableRef = ref(null)

const cptInnerPadding = computed(() => 'var(--el-card-padding)')

const tableColumn = [
  {
    prop: 'account',
    label: '账号',
    sortable: false,
    fixed: false,
    showOverflowTooltip: true
  },
  {
    prop: 'operation',
    label: '操作'
  }
]

const resetHandle = async row => {
  const { account, _id: id } = row
  // 逻辑删除
  try {
    await ElMessageBox.confirm(`是否要重置 ${account} 密码 ?`, '温馨提示', { confirmButtonText: 'OK', center: true, cancelButtonText: 'Cancel' })
    const res = await changeAccountStatusApi({ id, status: 2 })
    const { isSuccess } = resultFn(res)
    isSuccess && systemListTableRef.value.refresh()
  } catch (error) {
    error.msg && ElNotification({ message: error.msg, type: 'error' })
    console.log('error delete!', error)
  }
}

const ignoreHandle = async row => {
  const { _id: id } = row
  // 逻辑删除
  try {
    const res = await changeAccountStatusApi({ id, status: 3 })
    const { isSuccess } = resultFn(res)
    isSuccess && systemListTableRef.value.refresh()
  } catch (error) {
    error.msg && ElNotification({ message: error.msg, type: 'error' })
    console.log('error delete!', error)
  }
}
</script>
  
<style lang="scss">

</style>
  