'use client'

import { addProductToCart } from '@/hooks/product'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export default function ProductCard({ product }) {
  const router = useRouter();

  async function addToCart() {
    const res = await addProductToCart(product.id)
    if (res.success) {
      cookies.set('_vnpaydemo_cart_session_id', res.data?.sessionId)
      router.push('/cart')
    }
  }

  return (
    <div className="group hover:-translate-y-0.5 transition-transform duration-300 max-w-[300px] w-full mx-auto">
      <div className="flex flex-col items-center gap-y-4">
        <div className="w-full aspect-square relative rounded-xl bg-gray-700 hover:scale-90 transition-transform duration-300">
          <Image
            fill={true}
            sizes="(max-width: 768px) 100vw, 50vw"
            src={product.image}
            alt={product.name}
            className="object-cover rounded-xl"
          />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-base font-medium group-hover:underline">{product.name}</h1>
          <h2 className="text-lg font-semibold">
            {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
              product.price
            )}
          </h2>
        </div>
        <div className="flex items-center justify-center w-full px-4">
          <button
            type="button"
            onClick={() => addToCart(product.id)}
            className="text-sm py-2 px-3 border border-gray-600 bg-gray-300/50 rounded-xl hover:-translate-y-0.5 transition-transform duration-300"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  )
}
