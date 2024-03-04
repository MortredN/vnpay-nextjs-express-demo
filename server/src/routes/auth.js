const express = require('express')
const router = express.Router()
const { User } = require('../db')

router.post('/register', async function (req, res, next) {
  const { email, pasword } = req.body
  // TODO: Check JWT Cookie

  

  res.json({ success: true, message: '' })
})

module.exports = router