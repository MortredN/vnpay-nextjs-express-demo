'use strict'

class NumberUtils {
  static isInteger(value) {
    return /^\d+$/.test(value)
  }
}

module.exports = NumberUtils