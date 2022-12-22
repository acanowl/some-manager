/**
 * 1 增加权限
 * 2 删除权限
 * 3 查找权限
 * 4 修改权限
 */

const defaultCharacters = [
  {
    name: '管理员',
    prop: 'admin',
    power: {
      book: [1, 2, 3, 4],
      user: [1, 2, 3, 4]
    }
  },
  {
    name: '成员',
    prop: 'member',
    power: {
      book: [1],
      user: []
    }
  }
]

module.exports = {
  defaultCharacters
}