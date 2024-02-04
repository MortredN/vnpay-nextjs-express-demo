const express = require('express')
const router = express.Router()
const moment = require('moment')
const qs = require('qs')
const crypto = require('crypto')

const ObjectUtils = require('../utils/ObjectUtils')
const Constants = require('../configs/Constants')

router.post('/create_payment_url', function (req, res, next) {
  const { amount, locale, bankCode } = req.body

  process.env.TZ = 'Asia/Ho_Chi_Minh'
  const date = new Date()

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
  vnpQueryParams['vnp_OrderInfo'] = `Thanh toan don hang ${moment(date).format('YYYYMMDDHHmmss')}` // TODO: Replace with DB's order ID
  vnpQueryParams['vnp_OrderType'] = orderType
  vnpQueryParams['vnp_ReturnUrl'] = moment(date).add(10, 'minute').format('YYYYMMDDHHmmss')
  vnpQueryParams['vnp_TxnRef'] = moment(date).format('YYYYMMDDHHmmss') // TODO: Replace with DB's order ID

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

  res.redirect(vnpUrl)
})

router.get('/return', function (req, res, next) {
  let vnpQueryParams = req.query

  const secureHash = vnpQueryParams['vnp_SecureHash']
  delete vnpQueryParams['vnp_SecureHash']
  delete vnpQueryParams['vnp_SecureHashType']

  vnpQueryParams = ObjectUtils.sortAndEncodeObject(vnp_Params)

  const vnpQueryParamsQS = qs.stringify(vnpQueryParams, { encode: false })
  const hmac = crypto.createHmac('sha512', process.env.VNP_HASH_SECRET)
  const signed = hmac.update(Buffer.from(vnpQueryParamsQS, 'utf-8')).digest('hex')

  if (secureHash === signed) {
    const rspCode = vnpQueryParams['vnp_ResponseCode']
    const message = Constants.VNPAY_RSP_CODES_PAY.find((item) => item.rspCode == rspCode)?.message
    if (rspCode == '00') {
      res.json({ success: false, message })
    } else {
      res.json({ success: false, message })
    }
  } else {
    res.json({ success: false, message })
  }
})

module.exports = router
