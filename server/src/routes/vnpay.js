const express = require('express')
const router = express.Router()
const moment = require('moment')
const qs = require('qs')
const crypto = require('crypto')

const { CartSession, Product, Order, OrderItem } = require('../db')
const ObjectUtils = require('../utils/ObjectUtils')
const Constants = require('../configs/Constants')

router.post('/create_payment_url', async function (req, res, next) {
  const { _vnpaydemo_cart_session_id: cookieSessionId } = req.cookies
  const { locale, bankCode } = req.body

  if (!cookieSessionId) {
    return res.status(404).json({ success: false, message: 'Cart not found' })
  }

  process.env.TZ = 'Asia/Ho_Chi_Minh'
  const date = new Date()

  const order = await Order.create({ sessionId: cookieSessionId })
  const session = await CartSession.findByPk(cookieSessionId, {
    include: [
      {
        model: Product,
        attributes: ['id', 'price'],
        through: { attributes: ['quantity'] }
      }
    ]
  })

  let amount = 0

  for (const product of session.Products) {
    if (product.CartItem?.quantity) {
      const total = product.price * product.CartItem.quantity
      amount += total

      await OrderItem.create({
        orderId: order.id,
        productId: product.id,
        quantity: product.CartItem.quantity,
        price: product.price,
        total
      })
    }
  }

  await order.update({ total: amount })

  // Constants.VALID_ORDER_TYPES & https://sandbox.vnpayment.vn/apis/docs/loai-hang-hoa/
  const orderType = '100000'

  // https://sandbox.vnpayment.vn/apis/docs/thanh-toan-pay/pay.html
  let vnpQueryParams = {}

  vnpQueryParams['vnp_Version'] = '2.1.0'
  vnpQueryParams['vnp_Command'] = 'pay'
  vnpQueryParams['vnp_TmnCode'] = process.env.VNP_TMN_CODE
  vnpQueryParams['vnp_Amount'] = amount * 100
  vnpQueryParams['vnp_CreateDate'] = moment(date).format('YYYYMMDDHHmmss')
  vnpQueryParams['vnp_CurrCode'] = 'VND'
  vnpQueryParams['vnp_IpAddr'] = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null
  vnpQueryParams['vnp_Locale'] = locale === 'en' ? 'en' : 'vn'
  vnpQueryParams['vnp_OrderInfo'] = `Thanh toan don hang ${order.id}`
  vnpQueryParams['vnp_OrderType'] = orderType
  vnpQueryParams['vnp_ReturnUrl'] = process.env.VNP_RETURN_URL
  vnpQueryParams['vnp_TxnRef'] = order.id

  /*
    Depend if the user has already select a payment method on the client website
    or if they want to select on the VNPay portal
    They can also specify a bank code from (POST): https://sandbox.vnpayment.vn/qrpayauth/api/merchant/get_bank_list
  */
  if (bankCode && bankCode !== '') {
    vnpQueryParams['vnp_BankCode'] = bankCode
  }

  vnpQueryParams = ObjectUtils.sortAndEncodeObject(vnpQueryParams)

  const vnpQueryParamsQS = qs.stringify(vnpQueryParams, { encode: false })
  const hmac = crypto.createHmac('sha512', process.env.VNP_HASH_SECRET)
  const signed = hmac.update(Buffer.from(vnpQueryParamsQS, 'utf-8')).digest('hex')
  vnpQueryParams['vnp_SecureHash'] = signed

  const vnpUrl = process.env.VNP_URL + '?' + qs.stringify(vnpQueryParams, { encode: false })

  res.json({ success: true, vnpUrl })
})

router.get('/return', async function (req, res, next) {
  let vnpQueryParams = req.query

  const secureHash = vnpQueryParams['vnp_SecureHash']
  delete vnpQueryParams['vnp_SecureHash']

  vnpQueryParams = ObjectUtils.sortAndEncodeObject(vnpQueryParams)

  const vnpQueryParamsQS = qs.stringify(vnpQueryParams, { encode: false })
  const hmac = crypto.createHmac('sha512', process.env.VNP_HASH_SECRET)
  const signed = hmac.update(Buffer.from(vnpQueryParamsQS, 'utf-8')).digest('hex')

  const order = await Order.findByPk(vnpQueryParams['TxnRef'])

  let message = Constants.VNPAY_RSP_CODES_PAY.find((item) => item.rspCode == '97').message
  let success = false

  if (secureHash === signed && !!order) {
    const rspCode = vnpQueryParams['vnp_ResponseCode']
    message = Constants.VNPAY_RSP_CODES_PAY.find((item) => item.rspCode == rspCode)?.message
    if (rspCode == '00') {
      await order.update({ status: 'success' })
      success = true

      const session = await CartSession.findByPk(order.sessionId)
      const now = new Date()
      if (session) {
        await session.update({ expiredAt: now })
      }
    }
  }

  const redirectQS = qs.stringify({ success, message })
  res.redirect(`${process.env.CLIENT_ROOT}/order-success?${redirectQS}`)
})

module.exports = router
