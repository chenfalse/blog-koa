/**
 * @description User 数据模型
 * @author 陈佳兵
 */

const { Model } = require('sequelize')
const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

class User extends Model {}

User.init({
  userName: {
    type: STRING,
    allowNull: false,
    comment: '用户名',
    unique: true
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '昵称'
  },
  gender: {
    type: DECIMAL,
    comment: '性别 1男 2女 3保密',
    defaultValue: 3
  },
  city: {
    type: STRING,
    comment: '城市'
  },
  picture: {
    type: STRING,
    comment: '图片'
  }
}, {
  sequelize: seq,
  modelName: 'User'
})

module.exports = User