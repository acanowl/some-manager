export default {
  // 请求完成代码
  successCode: 0,
  // 表格每一页条数
  pageSize: 10,
  // 表格可设置的一页条数
  pageSizes: [10, 20, 30, 40, 50],
  // 表格分页布局，可设置"total, sizes, prev, pager, next, jumper"
  paginationLayout: 'prev, pager, next',
  // 数据统一转换
  parseData: res => {
    const { data, message, code } = res || {}
    return {
      data, // 无分页的数据字段结构
      rows: data.rows, // 行数据字段结构
      total: data.total, // 总数字段结构
      msg: message, // 描述字段结构
      code // 状态字段结构
    }
  },
  // 请求规定字段
  request: {
    page: 'page', // 规定当前分页字段
    pageSize: 'pageSize', // 规定一页条数字段
    prop: 'prop', // 规定排序字段名字段
    order: 'order' // 规定排序规格字段
  }
}
