'use client'

import { createPaymentUrl } from '@/hooks/order'
import { getShoppingCart, updateShoppingCartItemQuantity } from '@/hooks/cart'
import debounce from 'lodash.debounce'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

function ShoppingCartItem({ item, setCartItems }) {
  function removeItem() {
    setCartItems((cartItems) => cartItems.filter((ci) => ci.id !== item.id))
    debouncedUpdateCartHandler(0)
  }

  function decreaseItemQuantity() {
    if (item.quantity <= 1) {
      removeItem()
    } else {
      setCartItems((cartItems) =>
        cartItems.map((ci) => (ci.id === item.id ? { ...ci, quantity: ci.quantity - 1 } : ci))
      )
      debouncedUpdateCartHandler(item.quantity - 1)
    }
  }

  function increaseItemQuantity() {
    setCartItems((cartItems) =>
      cartItems.map((ci) => (ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci))
    )
    debouncedUpdateCartHandler(item.quantity + 1)
  }

  const updateCartHandler = (quantity) => {
    updateShoppingCartItemQuantity(item.id, quantity)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateCartHandler = useCallback(
    debounce((quantity) => {
      updateCartHandler(quantity)
    }, 500),
    []
  )

  return (
    <tr className="border-b border-gray-600">
      <td className="w-3/5">
        <div className="flex items-center justify-start py-3 gap-x-4">
          <div className="h-24 w-24 aspect-square relative rounded-xl">
            <Image
              fill={true}
              sizes="(max-width: 768px) 100vw, 50vw"
              src={item.image}
              alt={item.name}
              className="object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-medium">{item.name}</span>
            <span className="font-medium">
              {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                item.price
              )}
            </span>
          </div>
        </div>
      </td>
      <td className="w-1/5 text-center">
        <div className="flex text-lg font-medium justify-center">
          <button
            className="w-8 h-8 bg-white rounded-full border border-gray-600 flex items-center justify-center"
            type="button"
            onClick={decreaseItemQuantity}
          >
            -
          </button>
          <span className="w-8 h-8 flex items-center justify-center">{item.quantity}</span>
          <button
            className="w-8 h-8 bg-white rounded-full border border-gray-600 flex items-center justify-center"
            type="button"
            onClick={increaseItemQuantity}
          >
            +
          </button>
        </div>
        <button type="button" className="underline font-medium text-sm mt-1" onClick={removeItem}>
          Remove
        </button>
      </td>
      <td className="w-1/5 text-right text-lg font-semibold">
        {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
          item.quantity * item.price
        )}
      </td>
    </tr>
  )
}

export default function ShoppingCart() {
  const sessionId = cookies.get('_vnpaydemo_cart_session_id')
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    getShoppingCart().then((res) => setCartItems(res.data?.Products))
  }, [])

  async function redirectToPayment() {
    const res = await createPaymentUrl()
    if (res.success) {
      window.location.href = res.vnpUrl
    }
  }

  return (
    <div className="flex w-full">
      {sessionId && cartItems.length > 0 ? (
        <div className="flex w-full gap-x-8">
          <div className="w-3/4">
            <table className="w-full text-left">
              <thead>
                <tr className="h-12 border-b border-gray-600">
                  <th className="w-3/5">Sản phẩm</th>
                  <th className="w-1/5 text-center">Số lượng</th>
                  <th className="w-1/5 text-right">Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <ShoppingCartItem key={item.id} item={item} setCartItems={setCartItems} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-1/4 p-4">
            <div className="bg-gray-700 text-white rounded-xl p-8 flex flex-col">
              <h3 className="text-xl">Tổng tiền</h3>
              <span className="text-2xl mt-4">
                {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                  cartItems.reduce((prev, ci) => (prev += ci.quantity * ci.price), 0)
                )}
              </span>
              <button
                type="button"
                onClick={redirectToPayment}
                className="py-2 px-4 w-full bg-blue-900 rounded-lg mt-8"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-y-2 w-full">
          <span>Bạn đang chưa có gì trong giỏ hàng 😔</span>
          <Link href="/" className="font-medium underline">
            Tiếp tục mua hàng
          </Link>
        </div>
      )}
    </div>
  )
}
