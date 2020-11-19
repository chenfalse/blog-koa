const router = require('koa-router')()
const loginCheck = require('../middlewares/loginCheck')

router.get('/', loginCheck, async (ctx, next) => {
  ctx.body = "hello koa2"
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', loginCheck, async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
