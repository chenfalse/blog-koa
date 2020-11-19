/**
 * @description 密码加密
 * @author 陈佳兵
 */

const crypto = require('crypto')
const { SECRET_PASSWORD_KEY } = require('../conf/secret')

/**
 * md5 加密方法
 * @param {string} content 明文
 */
function _md5(content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * 加密
 * @param {string} content 明文
 */
function doCrypto(content) {
  const str = `password=${content}&${SECRET_PASSWORD_KEY}`
  return _md5(str)
}

module.exports = doCrypto