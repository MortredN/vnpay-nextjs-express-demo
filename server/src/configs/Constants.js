const Constants = {
  VNPAY_RSP_CODES_PAY: [
    {
      rspCode: '0',
      message: 'Giao dịch thành công'
    },
    {
      rspCode: '7',
      message:
        'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).'
    },
    {
      rspCode: '9',
      message:
        'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.'
    },
    {
      rspCode: '10',
      message:
        'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần'
    },
    {
      rspCode: '11',
      message:
        'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.'
    },
    {
      rspCode: '12',
      message: 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.'
    },
    {
      rspCode: '13',
      message:
        'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.'
    },
    {
      rspCode: '24',
      message: 'Giao dịch không thành công do: Khách hàng hủy giao dịch'
    },
    {
      rspCode: '51',
      message:
        'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.'
    },
    {
      rspCode: '65',
      message:
        'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.'
    },
    {
      rspCode: '75',
      message: 'Ngân hàng thanh toán đang bảo trì.'
    },
    {
      rspCode: '79',
      message:
        'Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch'
    },
    {
      rspCode: '97',
      message: 'Chữ ký không hợp lệ'
    },
    {
      rspCode: '99',
      message: 'Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)'
    }
  ],

  // https://sandbox.vnpayment.vn/apis/docs/thanh-toan-pay/pay.html
  VNPAY_PAYMENT_METHODS: ['VNPAYQR', 'VNBANK', 'INTCARD'],

  // https://sandbox.vnpayment.vn/apis/docs/loai-hang-hoa/
  VNPAY_VALID_ORDER_TYPES: [
    '100000',
    '100001',
    '100003',
    '100004',
    '100005',
    '110000',
    '110001',
    '110002',
    '110003',
    '110004',
    '110005',
    '120000',
    '120001',
    '120002',
    '120003',
    '130000',
    '130001',
    '130002',
    '130003',
    '130004',
    '130005',
    '130006',
    '130007',
    '130008',
    '140000',
    '140001',
    '140002',
    '140003',
    '140004',
    '140005',
    '150000',
    '150001',
    '150002',
    '150003',
    '160000',
    '160001',
    '160002',
    '160003',
    '160004',
    '170000',
    '170001',
    '170002',
    '170003',
    '180000',
    '190000',
    '190001',
    '190002',
    '190003',
    '190004',
    '200000',
    '200001',
    '200002',
    '200003',
    '200004',
    '210000',
    '210001',
    '210002',
    '210003',
    '210004',
    '220000',
    '220001',
    '220002',
    '220003',
    '220004',
    '230000',
    '230001',
    '240000',
    '240001',
    '240002',
    '240003',
    '240004',
    '250000',
    '250001',
    '250002',
    '250003',
    '250004',
    '250005',
    '250006',
    '250007',
    '260000',
    '260001',
    '260002',
    '270000',
    '270001'
  ]
}

module.exports = Constants
