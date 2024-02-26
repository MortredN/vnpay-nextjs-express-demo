'use client'

import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { checkCartSession } from '@/hooks/cart'

const cookies = new Cookies()

const ShoppingCartCounter = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    checkCartSession().then((res) => {
      if (res.data.expired) {
        cookies.remove('_vnpaydemo_cart_session_id')
      } else {
        setCount(res.data.count)
      }
    })
  }, [])

  if (!count) return null

  return (
    <span className="absolute w-6 h-6 flex items-center justify-center -bottom-2 -right-2 font-bold text-sm bg-[#010a11] text-white rounded-full">
      {count}
    </span>
  )
}
export default ShoppingCartCounter
