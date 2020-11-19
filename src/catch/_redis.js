/**
 * @description redis 建立连接 set get
 * @author 陈佳兵
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.host, REDIS_CONF.port)

redisClient.on('error', err => {
  console.log('redis 连接失败', err )
})

/**
 * 
 * @param {string} key key
 * @param {string} value value
 * @param {number} timeout 过期时间 秒
 */
function set(key, value, timeout = 60 * 60) {
  if(typeof value === 'object') {
    value = JSON.stringify(value)
  }
  redisClient.set(key, value)
  redisClient.expire(key, timeout)
}

/**
 * 
 * @param {string} key key
 */
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if(err) {
        reject(err)
        return
      }

      if(val == null) {
        resolve(null)
        return
      }

      try {
        resolve(JSON.parse(val))
      } catch (error) {
        resolve(val)
      }

    })
  })
  return promise
}

module.exports = {
  set,
  get
}




