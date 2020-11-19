/**
 * @description user 路由
 * @author 陈佳兵
 */

const router = require('koa-router')()
const {
  isExist,
  register,
  login,
  changeInfo,
  changePasswrod
} = require('../controller/users')
router.prefix('/api/users')

// 用户名是否存在
router.post('/isExist', async(ctx, next) => {
  const { userName } = ctx.request.body
  ctx.verifyParams({
    userName: {
      type: 'string',
      required: true
    }
  })
  ctx.body = await isExist(userName)
})

// 注册
router.post('/register', async (ctx, next) => {
  const { userName, password, nickName } = ctx.request.body
  ctx.verifyParams({
    userName: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    nickName: {
      type: 'string',
      required: false
    }
  })
  ctx.body = await register({ userName, password, nickName })
})

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.verifyParams({
    userName: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  })
  ctx.body = await login(ctx, userName, password)
})

// 修改个人信息
router.post('/changeInfo', async (ctx, next) => {
  const { gender, picture, city } = ctx.request.body
  ctx.verifyParams({
    gender: {
      type: 'number',
      required: false
    },
    picture: {
      type: 'string',
      required: false
    },
    city: {
      type: 'string',
      required: false
    },
  })
  ctx.body = await changeInfo(ctx, { gender, picture, city })
})

// 修改密码
router.post('/changePassword', async (ctx, next) => {
  const { password, newPassword } = ctx.request.body
  ctx.verifyParams({
    password: {
      type: 'string'
    },
    newPassword: {
      type: 'string'
    }
  })
  ctx.body = await changePasswrod(ctx, { password, newPassword })
})

module.exports = router

