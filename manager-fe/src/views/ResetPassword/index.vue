<template lang="pug">
el-card.reset-password.flex-1(shadow="never" :body-style="{ height: '100%' }")
  the-table(ref="systemListTableRef" :requestApi="systemLogListApi" :column="tableColumn" :innerPadding="cptInnerPadding")
    template(#operation="{ row }")
      .pr-10px.inline-block
        el-link(type="primary" @click="resetHandle(row)") 重置
      .pr-10px.inline-block
        el-link(type="danger" @click="ignoreHandle(row)") 忽略
</template>
  
<script setup>
import { resultFn } from '@/utils/tool'
import { systemLogListApi, systemLogDeleteApi } from '@/api'

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
  console.log(row, 'resetHandle')
}

const ignoreHandle = async row => {
  const { _id: id } = row
  // 逻辑删除
  try {
    const res = await systemLogDeleteApi({ id })
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
  