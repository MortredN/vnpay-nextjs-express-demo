const express = require('express')
const router = express.Router()
const { Op } = require('sequelize')

const { Product, CartSession, CartItem } = require('../db')
const middleware = require('../middleware')

router.get('/', [middleware.authenticate], async function (req, res, next) {
  const { _vnpaydemo_cart_session_id: cookieSessionId } = req.cookies

  let session = null

  if (cookieSessionId) {
    const query = { id: cookieSessionId }
    if (req.user) {
      query.userId = req.user.id
    }

    session = await CartSession.findOne({
      where: query,
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'image'],
          through: { attributes: ['quantity'] }
        }
      ]
    })
    if (session) {
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
  }

  res.json({ success: true, data: session })
})

router.get('/check', [middleware.authenticate], async function (req, res, next) {
  const { _vnpaydemo_cart_session_id: cookieSessionId } = req.cookies

  let expired = true
  let count = 0

  let session = null
  const now = new Date()

  if (cookieSessionId) {
    const query = { id: cookieSessionId, expiredAt: { [Op.gte]: now } }
    if (req.user) {
      query.userId = req.user.id
    }

    session = await CartSession.findOne({
      where: query,
      include: [
        {
          model: Product,
          attributes: ['name']
        }
      ]
    })
    if (session) {
      expired = false
      session = session.toJSON()
      if (Array.isArray(session.Products)) {
        count = session.Products.length
      }
    }
  }

  res.json({ success: true, data: { expired, count } })
})

router.post('/add', [middleware.authenticate], async function (req, res, next) {
  const { productId } = req.body
  const { _vnpaydemo_cart_session_id: cookieSessionId } = req.cookies

  const product = await Product.findByPk(productId)
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' })
  }

  let sessionId = cookieSessionId

  const now = new Date()
  const newExpiredAt = new Date().setDate(now.getDate() + 7)

  if (sessionId) {
    const query = { id: sessionId, expiredAt: { [Op.gte]: now } }
    if (req.user) {
      query.userId = req.user.id
    }

    const [session] = await CartSession.findOrCreate({
      where: { id: sessionId, expiredAt: { [Op.gte]: now } },
      defaults: req.user
        ? { expiredAt: newExpiredAt, userId: req.user.id }
        : { expiredAt: newExpiredAt }
    })
    sessionId = session.id
  } else {
    const session = await CartSession.create(
      req.user ? { expiredAt: newExpiredAt, userId: req.user.id } : { expiredAt: newExpiredAt }
    )
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

router.post('/update-quantity', async function (req, res, next) {
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
