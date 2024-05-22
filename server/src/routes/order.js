const express = require('express')
const router = express.Router()

const middleware = require('../middleware')
const { Order, Product } = require('../db')

router.get('/', [middleware.authenticate], async function (req, res, next) {
  const { _vnpaydemo_cart_session_id: cookieSessionId } = req.cookies
  console.log('CHECK B')
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Not Authorized' })
  }

  const orders = await Order.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: Product,
        attributes: ['id', 'name', 'price', 'image'],
        through: { attributes: ['price', 'quantity', 'total'] }
      }
    ],
    order: [['createdAt', 'DESC']]
  })
  let renderOrders = []
  if (orders) {
    for (let order of orders) {
      let newOrder = order.toJSON()
      if (Array.isArray(newOrder.Products)) {
        for (const product of newOrder.Products) {
          product.price = product.OrderItem?.price
          product.quantity = product.OrderItem?.quantity
          product.total = product.OrderItem?.total
          delete product.OrderItem
        }
      }
      renderOrders.push(newOrder)
    }
  }

  res.json({ success: true, data: renderOrders })
})

module.exports = router
