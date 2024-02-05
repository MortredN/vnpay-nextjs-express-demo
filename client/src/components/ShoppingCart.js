'use client'

import Link from 'next/link'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const ShoppingCart = () => {
  const sessionId = cookies.get('_vnpaydemo_cart_session_id')

  return (
    <div className="flex">
      {sessionId ? (
        <></>
      ) : (
        <div className="flex flex-col items-center gap-y-2">
          <span>Bạn đang chưa có gì trong giỏ hàng 😔</span>
          <Link href="/" className="font-medium underline">
            Tiếp tục mua hàng
          </Link>
        </div>
      )}
    </div>
  )
}

export default ShoppingCart
