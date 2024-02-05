const express = require('express')
const router = express.Router()
const { Product, CartSession, CartItem } = require('../db')

router.get('/', async function (req, res, next) {
  const products = await Product.findAll({ order: [['createdAt', 'DESC']] })
  res.json({ success: true, data: products })
})

router.post('/add-cart', async function (req, res, next) {
  const { productId } = req.body
  const { _vnpaydemo_cart_session_id: cookieSessionId } = req.cookies

  const product = await Product.findByPk(productId)
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' })
  }

  // TODO: If user is logged in, use user's session instead from cookie
  let sessionId = cookieSessionId
  if (sessionId) {
    const [session] = await CartSession.findOrCreate({
      where: { id: sessionId }
    })
    sessionId = session.id
  } else {
    const session = await CartSession.create({
      where: { id: sessionId }
    })
    sessionId = session.id
  }

  const [cartItem, created] = await CartItem.findOrCreate({
    where: { productId, sessionId },
    defaults: {
      productId,
      sessionId,
      quantity: 1
    }
  })
  if (!created) {
    cartItem.update({ quantity: cartItem.quantity + 1 })
  }

  res.json({ success: true, data: { sessionId } })
})

module.exports = router
