<template lang="pug">
.the-table(v-loading="isLoading" :style="cptHeight")
  el-table(:data="tableData" :row-key="rowKey" :key="toggleIndex" ref="theTableRef" height="100%" :border="config.border" :stripe="config.stripe" @sort-change="sortChange")
    slot
    el-table-column(v-for="(item, index) in column" :key="index" :column-key="item.prop" :label="item.label" :prop="item.prop" :width="item.width" :sortable="item.sortable" :fixed="item.fixed" :show-overflow-tooltip="item.showOverflowTooltip")
      template(#default="scope")
        slot(:name="item.prop" v-bind="scope") {{ item.format ? item.format(scope.row[item.prop]) :  scope.row[item.prop] }}
    el-table-column(min-width="1")
    template(#empty)
      el-empty(:description="emptyText" :image-size="100")
  el-pagination.pt-10px(v-if="!hidePagination" :layout="paginationLayout" :total="total" :page-size="currentPageSize" :page-sizes="pageSizes" v-model:currentPage="currentPage" @current-change="paginationChange" @update:page-size="pageSizeChange")
</template>

<script setup>
import defaultConfig from './config'

const toggleIndex = 0
const theTableRef = ref(null)

const props = defineProps({
  requestApi: Function,
  params: { type: Object, default: () => ({}) },
  data: { type: Array, default: () => ([]) },
  border: { type: Boolean, default: false },
  stripe: { type: Boolean, default: false },
  pageSize: { type: Number, default: defaultConfig.pageSize },
  pageSizes: { type: Array, default: defaultConfig.pageSizes },
  rowKey: { type: String, default: '' },
  column: { type: Array, default: () => [] },
  remoteSort: { type: Boolean, default: false }, // 远程排序
  hidePagination: { type: Boolean, default: false },
  paginationLayout: { type: String, default: defaultConfig.paginationLayout },
  innerPadding: { type: [String, Number], default: '0' },
})

const emits = defineEmits(['dataChange'])

const cptHeight = computed(() => ({ height: props.hidePagination ? '100%' : `calc( 100% - 32px - ${props.innerPadding})` }))

const config = reactive({ border: props.border, stripe: props.stripe })

// 是否需要请求接口
const isNeedRequest = () => typeof props.requestApi === 'function'

// 排序事件
let prop = ref(null)
let order = ref(null)
const sortChange = obj => {
  if (!props.remoteSort) {
    return false
  }
  if (obj.column && obj.prop) {
    prop.value = obj.prop
    order.value = obj.order
  } else {
    prop.value = null
    order.value = null
  }
  getData()
}

/**
 * 页码相关
 */
let total = ref(0)
let currentPage = ref(1)
let currentPageSize = ref(props.pageSize)
// 分页点击
const paginationChange = () => getData()
// 条数变化
const pageSizeChange = size => {
  currentPageSize.value = size
  getData()
}

// 状态相关
let isLoading = ref(false)
let emptyText = ref('暂无数据')
// 列表数据 & 接口请求参数
let tableData = ref([])
let tableParams = toRef(props.params)

// 刷新数据
const refresh = () => {
  clearSelection()
  getData()
}
// 更新数据 合并上一次params
const upData = (params, page = 1) => {
  currentPage.value = page
  clearSelection()
  Object.assign(tableParams.value, params || {})
  getData()
}
// 重载数据 替换params
const reload = (params, page = 1) => {
  currentPage.value = page
  tableParams.value = params || props.params || {}
  clearSelection()
  clearSort()
  getData()
}

// 获取数据
const getData = async () => {
  isLoading.value = true
  if (isNeedRequest()) {
    const { request, parseData, successCode } = defaultConfig
    let reqData = {
      [request.prop]: prop.value,
      [request.order]: order.value,
      // 隐藏分页器则不需要页码
      ...(props.hidePagination ? {} : {
        [request.page]: currentPage.value,
        [request.pageSize]: currentPageSize.value
      })
    }
    Object.assign(reqData, tableParams.value)

    try {
      const res = await props.requestApi(reqData)
      const response = parseData(res)
      if (response.code === successCode && res.data) {
        emptyText.value = '暂无数据'
        tableData.value = (props.hidePagination ? response.data : response.rows) || []
        total.value = response.total || 0
        theTableRef.value.setScrollTop(0)
        emits('dataChange', res, tableData.value)
      } else {
        emptyText.value = response.code === successCode ? '暂无数据' : response.msg
      }
    } catch (error) {
      emptyText.value = error.msg || '数据格式错误'
    }
  } else {
    tableData.value = props.data
    total.value = tableData.value.length
  }
  isLoading.value = false
}

// 获取数据
onMounted(() => getData())

// 插入行 unshiftRow
const unshiftRow = row => tableData.value.unshift(row)
// 插入行 pushRow
const pushRow = row => tableData.value.push(row)

// 根据index覆盖数据
const updateIndex = (row, index) => Object.assign(tableData.value[index], row)
// 根据index删除
const removeIndex = index => tableData.value.splice(index, 1)
// 根据index批量删除
const removeIndexes = (indexes = []) => indexes.forEach(index => tableData.value.splice(index, 1))

// 根据key覆盖数据
const updateKey = (row, rowKey = this.rowKey) => {
  tableData.value
    .filter(item => item[rowKey] === row[rowKey])
    .forEach(item => {
      Object.assign(item, row)
    })
}
// 根据key删除
const removeKey = (key, rowKey = this.rowKey) => {
  tableData.value.splice(
    tableData.value.findIndex(item => item[rowKey] === key), 1
  )
}
// 根据keys批量删除
const removeKeys = (keys = [], rowKey = this.rowKey) => {
  keys.forEach(key => {
    tableData.value.splice(
      tableData.value.findIndex(item => item[rowKey] === key), 1
    )
  })
}

// element plus el-table 原生方法
const toggleRowSelection = (row, selected) => theTableRef.value?.toggleRowSelection(row, selected)
const clearSelection = () => theTableRef.value?.clearSelection()
const setCurrentRow = row => theTableRef.value?.setCurrentRow(row)
const doLayout = () => theTableRef.value?.doLayout()
// 'ascending' 'descending'
const sort = (prop, order) => theTableRef.value?.sort(prop, order)
const clearSort = () => theTableRef.value?.clearSort()
const toggleAllSelection = () => theTableRef.value?.toggleAllSelection()

defineExpose({
  refresh,
  upData,
  reload,

  unshiftRow,
  pushRow,
  updateKey,
  updateIndex,
  removeIndex,
  removeIndexes,
  removeKey,
  removeKeys,

  clearSelection,
  toggleRowSelection,
  toggleAllSelection,
  setCurrentRow,
  clearSort,
  doLayout,
  sort
})
</script>

<script>
export default { name: 'the-table' }
</script>

<style lang="scss">
.the-table {
  .el-pagination {
    justify-content: flex-end;
  }
}
</style>
