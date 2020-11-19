/**
 * @description user controller
 * @author 陈佳兵
 */

const { getUserInfo, createUser } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const doCrypto = require('../utils/doCrypto')

/**
 * 判断用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if(userInfo) {
    return new SuccessModel({
      message: '昵称已存在，不可使用'
    })
  }
  
  return new ErrorModel({
    errno: 10001,
    message: '昵称不存在，可以使用',
    url: '/api/users/isExist'
  })

}

/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {string} nickName 昵称
 */

async function register({ userName, password, nickName }) {
  const userInfo = await getUserInfo(userName)
  if(userInfo) {
    return new SuccessModel({
      message: '昵称已存在，不可使用'
    })
  }
  try {
    await createUser({ 
      userName, 
      password: doCrypto(password), 
      nickName })
    return new SuccessModel({
      errno: 0,
      message: '注册成功'
    })
  } catch (error) {
    console.error('error', error)
    return new ErrorModel({
      errno: 10002,
      message: '注册失败，服务器出了点问题',
      url: '/api/users/register'
    })
  }
}

/**
 * 登录
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if(userInfo) {
    if(!ctx.session.userInfo) {
      ctx.session.userInfo = userInfo
    }
    return new SuccessModel({
      message: '登录成功'
    })
  }
  return new ErrorModel({
    errno: 10003,
    message: '登录失败',
    url: '/api/users/login'
  })
}

module.exports = {
  isExist,
  register,
  login
}