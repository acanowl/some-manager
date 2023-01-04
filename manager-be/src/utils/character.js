/**
 * 1 增加权限
 * 2 删除权限
 * 3 查找权限
 * 4 修改权限
 */

const defaultCharacters = [
  {
    name: '管理员',
    prop: 'SA',
    power: {
      book: [1, 2, 3, 4],
      user: [1, 2, 3, 4]
    }
  },
  {
    name: '成员',
    prop: 'ME',
    power: {
      book: [1],
      user: []
    }
  }
]

const defaultUser = [
  {
    account: 'admin',
    password: '1234',
    character: 'SA'
  }
]

module.exports = {
  defaultCharacters,
  defaultUser
}
