const express = require('express')
const router = express.Router()

const { Product } = require('../db')

router.get('/', async function (req, res, next) {
  const products = await Product.findAll({ order: [['createdAt', 'DESC']] })
  res.json({ success: true, data: products })
})

module.exports = router
