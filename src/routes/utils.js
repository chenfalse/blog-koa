/**
 * @description 上传图片
 * @author 陈佳兵
 */

const router = require('koa-router')()
const koaForm = require("formidable-upload-koa")
const { uploadImg } = require('../controller/utils') 
router.prefix('/api/utils')

router.post('/upload', koaForm(), async (ctx, next) => {
  const files = ctx.req.files
  for(let key in files) {
    const { size, name, path } = files[key]
    await uploadImg({
      size,
      name,
      filePath: path
    })
  }
  ctx.body = {
    message: '图片上传成功'
  }
})

module.exports = router