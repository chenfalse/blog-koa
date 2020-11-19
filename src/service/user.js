/**
 * @description user 数据操作
 * @author 陈佳兵
 */

const { User } = require('../db/models/index')

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {

  let whereOpt = {
    userName
  }

  if(password) {
    whereOpt = Object.assign(whereOpt, {
      password
    })
  }

  const userInfo = await User.findOne({
    where: whereOpt,
    attributes: ['id', 'userName', 'nickName', 'gender', 'picture', 'city']
  })

  if(!userInfo) {
    return null
  }

  return userInfo.dataValues

}

/**
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {string} nickName 昵称
 */
async function createUser({ userName, password, nickName }) {
  const userRes = await User.create({
    userName,
    password,
    nickName: nickName ? nickName : userName
  })
  return userRes.dataValues
}

module.exports = {
  getUserInfo,
  createUser
}