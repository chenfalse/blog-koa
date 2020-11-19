/**
 * @description sequelize 同步数据库
 * @author 陈佳兵
 */
 
const seq = require('./seq')
require('./models/index')

!(async function () {

  try {
    await seq.authenticate();
    console.log('数据库连接成功.');
  } catch (error) {
    console.error('数据库连接失败:', error);
  }

  try {
    await seq.sync({ force: true });
    console.log("同步成功");
  } catch (error) {
    console.log("同步失败", error);
  }
})()

