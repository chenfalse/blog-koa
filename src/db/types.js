/**
 * @description sequelize 数据类型
 * @author 陈佳兵
 */

const {  DataTypes } = require('sequelize')

module.exports = {
  STRING: DataTypes.STRING,
  INTEGER: DataTypes.INTEGER,
  DECIMAL: DataTypes.DECIMAL,
  TEXT: DataTypes.TEXT,
  BOOLEAN: DataTypes.BOOLEAN
}