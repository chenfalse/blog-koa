/**
 * @description 登录中间件
 * @author 陈佳兵
 */

const { ErrorModel } = require('../model/ResModel')

 /**
  * 登录验证中间件
  * @param {object} ctx 
  * @param {function} next 
  */

async function loginCheck(ctx, next) {
  if(ctx.session && ctx.session.userInfo) {
    await next()
    return
  }
  ctx.body = new ErrorModel({
    errno: 401,
    message: '当前未登录，禁止访问'
  })
}

module.exports = loginCheck