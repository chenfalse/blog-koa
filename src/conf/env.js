/**
 * @deprecated env 环境变量
 * @author 陈佳兵
 */

const ENV = process.env.NODE_ENV

module.exports = {
  isDev: ENV === 'dev',
  isProd: ENV === 'production'
}