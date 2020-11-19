/**
 * @description 数据库和redis配置
 * @author 陈佳兵
 */

const { isProd } = require('./env')

let MYSQL_CONF = {
  host: 'localhost',
  database: 'blog',
  username: 'root',
  password: 'c101498',
}

let REDIS_CONF = {
  host: '127.0.0.1',
  port: 6379
}

if(isProd) {

  MYSQL_CONF = {
    host: 'localhost',
    database: 'blog',
    username: 'root',
    password: 'c101498',
  }

  REDIS_CONF = {
    host: '127.0.0.1',
    port: 3306
  }

}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}