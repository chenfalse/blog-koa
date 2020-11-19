/**
 * @description user controller
 * @author 陈佳兵
 */

const { 
  getUserInfo, 
  createUser, 
  updateUserInfo 
} = require('../service/user')
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

/**
 * 修改个人信息
 * @param {string} gender 性别 1男 2nv 3保密
 * @param {string} picture 图片
 * @param {string} city 城市
 */
async function changeInfo(ctx, { gender, picture, city }) {
  const { userName } = ctx.session.userInfo
  const result = await updateUserInfo(
    {
      newGender: gender,
      newPicture: picture,
      newCity: city
    },
    {
      userName
    }
  )
  if(result) {
    Object.assign(ctx.session.userInfo, {
      gender,
      picture,
      city
    })
    return new SuccessModel({
      message: '更新用户信息成功'
    })
  }
  return new ErrorModel({
    errno: 10006,
    message: '更新失败'
  })
}

/**
 * 修改密码
 * @param {object} { password, newPassword } 新旧密码
 */
async function changePasswrod(ctx, { password, newPassword }) {
  const { userName } = ctx.session.userInfo

  const result = await updateUserInfo({
    newPassword: doCrypto(newPassword)
  }, {
    userName,
    password: doCrypto(password)
  })

  if(result) {
    return new SuccessModel({
      message: '密码修改成功'
    })
  }
  return new ErrorModel({
    errno: 10008,
    message: '密码修改失败'
  })
}


module.exports = {
  isExist,
  register,
  login,
  changeInfo,
  changePasswrod
}