<template lang="pug">
el-card.system-log.flex-1(shadow="never" :body-style="{ height: '100%' }")
  the-table.pt-20px(ref="systemListTableRef" :requestApi="systemLogListApi" :column="tableColumn" :innerPadding="cptInnerPadding")
    template(#operation="{ row }")
      el-link(type="danger" @click="deleteHandle(row)") 删除
</template>
  
<script setup>
import { useDateFormat } from '@vueuse/core'
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
    prop: 'urlLabel',
    label: '地址',
  },
  {
    prop: 'meta.createdAt',
    label: '创建时间',
    format: val => useDateFormat(val, 'YYYY-MM-DD HH:mm:ss').value
  },
  {
    prop: 'operation',
    label: '操作'
  }
]


const deleteHandle = async row => {
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
  