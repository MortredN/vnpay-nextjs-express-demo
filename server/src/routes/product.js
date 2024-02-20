const express = require('express')
const router = express.Router()
const { Product, CartSession, CartItem } = require('../db')

router.get('/', async function (req, res, next) {
  const products = await Product.findAll({ order: [['createdAt', 'DESC']] })
  res.json({ success: true, data: products })
})

router.get('/cart', async function (req, res, next) {
  const { _vnpaydemo_cart_session_id: cookieSessionId } = req.cookies

  let session = null

  if (cookieSessionId) {
    session = await CartSession.findByPk(cookieSessionId, {
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'image'],
          through: { attributes: ['quantity'] }
        }
      ]
    })
    session = session.toJSON()
    if (Array.isArray(session.Products)) {
      for (const product of session.Products) {
        if (product.CartItem?.quantity) {
          product.quantity = product.CartItem.quantity
          delete product.CartItem
        }
      }
    }
  }

  res.json({ success: true, data: session })
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
    await cartItem.update({ quantity: cartItem.quantity + 1 })
  }

  res.json({ success: true, data: { sessionId } })
})

router.post('/update-cart-quantity', async function (req, res, next) {
  const { productId, quantity } = req.body
  const { _vnpaydemo_cart_session_id: cookieSessionId } = req.cookies

  if (cookieSessionId) {
    const cartItem = await CartItem.findOne({
      where: { productId, sessionId: cookieSessionId }
    })

    if (cartItem) {
      if (quantity) {
        await cartItem.update({ quantity })
      } else {
        await cartItem.destroy()
      }
    }
  }

  res.json({ success: true, message: 'Update successfully' })
})

module.exports = router
