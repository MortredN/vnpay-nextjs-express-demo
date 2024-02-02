const express = require('express')
const router = express.Router()

router.use('/vnpay', require('./vnpay'))

module.exports = router
