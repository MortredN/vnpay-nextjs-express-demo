'use strict'

class ObjectUtils {
  static sortAndEncodeObject(object) {
    let sorted = {}
    let keys = []
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        keys.push(encodeURIComponent(key))
      }
    }
    keys.sort()
    for (let i = 0; i < keys.length; i++) {
      sorted[keys[i]] = encodeURIComponent(object[keys[i]]).replace(/%20/g, '+')
    }
    return sorted
  }
}

module.exports = ObjectUtils
