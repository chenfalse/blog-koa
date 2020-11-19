/**
 * @description sequelize 实例
 * @author 陈佳兵
 */

const { Sequelize } = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')

const { host, database, username, password } =  MYSQL_CONF

const config = {
  host,
  dialect: 'mysql'
}

const seq = new Sequelize(database, username, password, config)

module.exports = seq