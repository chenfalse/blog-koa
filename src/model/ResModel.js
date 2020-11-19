/**
 * @description  数据统一返回格式信息
 * @author 陈佳兵
 */

 /**
  * 基础模型定义
  */
class BaseModel {
  constructor({errno, message, url, data={}}) {
    this.errno = errno
    if(message) {
      this.message = message
    }
    if(url) {
      this.url = url
    }
    if(data) {
      this.data = data
    }
  }
}

/**
 * 成功信息模型
 */

class SuccessModel extends BaseModel {
  constructor({message, data}) {
    super({
      errno: 0,
      message,
      data
    })
  }
}

/**
 * 失败信息模型
 */
class ErrorModel extends BaseModel {
  constructor({errno, message, url}) {
    super({
      errno,
      message,
      url
    })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}