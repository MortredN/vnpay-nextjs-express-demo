/* eslint-disable @next/next/no-img-element */
'use client'

import { getOrders } from '@/hooks/order'
import { useEffect, useState } from 'react'

const Orders = () => {
  const [orders, setOrders] = useState([])
  console.log('orders', orders)

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.data)
    })
  }, [])

  return (
    <div className="max-w-[800px] mx-auto w-full mt-12 flex flex-col gap-y-8">
      {orders?.map((order) => (
        <div key={order?.id} className="w-full flex flex-col p-8 bg-white rounded-xl">
          <span className="font-semibold">Đơn hàng # {order.id}</span>
          <div className="flex flex-col w-full gap-y-4 my-6">
            {order.Products?.map((item) => (
              <div key={item.id} className="flex items-center gap-x-4">
                <img src={item.image} className="size-[80px] rounded-lg" alt="" />
                <span className="flex-1 font-medium">{item.name}</span>
                <div className="flex flex-col gap-y-2 text-right">
                  <span className="text-sm">
                    {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                      item.price
                    )}{' '}
                    x {item.quantity}
                  </span>
                  <span className="font-medium">
                    {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                      item.total
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <span className="text-right text-lg font-bold">
            Tổng tiền:{' '}
            {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}
          </span>
        </div>
      ))}
    </div>
  )
}
export default Orders
