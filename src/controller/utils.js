/**
 * @description 图片上传
 * @author 陈佳兵
 */

const path = require('path')
const fse = require('fs-extra')
const { ErrorModel } = require('../model/ResModel')

const MAX_SIZE = 1024 * 1024 * 1024 * 2 //文件体积

const DIST_FILE_PATH = path.join(__dirname, '..', '..', 'uploadFiles') // 文件存放目录

fse.pathExists(DIST_FILE_PATH).then(exists => {
  if(!exists) {
    fse.ensureDir(DIST_FILE_PATH)
  }
})

/**
 * 图片上传
 * @param {string} name 文件名称
 * @param {string} size 文件体积
 * @param {string} filePath 文件路径
 */
async function uploadImg({ name, size, filePath }) {

  if(size > MAX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel({
      errno: 10005,
      mssage: '上传文件体积过大'
    })
  }

  const fileName = Date.now() + '-' + name
  const distFilePath = path.join(DIST_FILE_PATH, fileName)
  await fse.move(filePath, distFilePath)

}

module.exports = {
  uploadImg
}