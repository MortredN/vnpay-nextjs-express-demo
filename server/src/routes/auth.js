const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../db')

router.post('/register', async function (req, res, next) {
  const { email, password } = req.body

  if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) || !password || password == '') {
    return res.status(403).json({ success: false, message: 'Email or password is invalid' })
  }

  const existedUser = await User.findOne({ where: { email } })
  if (existedUser) {
    return res.status(404).json({ success: false, message: 'Email has already been used' })
  }

  const saltRounds = 10
  const passHash = await bcrypt.hash(password, saltRounds)
  const user = await User.create({ email, password: passHash, type: 'customer' })

  const token = jwt.sign(
    {
      id: user.id
    },
    process.env.JWT_SECRET
  )

  res.json({ success: true, data: { token } })
})

router.post('/login', async function (req, res, next) {
  const { email, password } = req.body

  if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) || !password || password == '') {
    return res.status(403).json({ success: false, message: 'Email or password is invalid' })
  }

  const user = await User.findOne({ where: { email } })
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ success: false, message: 'Email or password is incorrect' })
  }

  const token = jwt.sign(
    {
      id: user.id
    },
    process.env.JWT_SECRET
  )

  res.json({ success: true, data: { token } })
})

module.exports = router
