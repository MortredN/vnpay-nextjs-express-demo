const express = require('express')
const router = express.Router()

router.use('/product', require('./product'))
router.use('/cart', require('./cart'))

router.use('/vnpay', require('./vnpay'))

module.exports = router
