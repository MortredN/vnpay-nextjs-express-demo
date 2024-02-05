const express = require('express')
const router = express.Router()

router.use('/vnpay', require('./vnpay'))
router.use('/product', require('./product'))

module.exports = router
