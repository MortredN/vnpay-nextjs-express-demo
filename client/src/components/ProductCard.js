'use client';

import Image from 'next/image'

export default function ProductCard({ product }) {
  return (
    <div className="group hover:-translate-y-0.5 transition-transform duration-300 max-w-[300px] w-full mx-auto">
      <div className="flex flex-col items-center gap-y-4">
        <div className="w-full aspect-square relative rounded-xl bg-gray-700 hover:scale-90 transition-transform duration-300">
          <Image
            fill={true}
            src={product.image}
            alt={product.name}
            className="object-cover rounded-xl"
          ></Image>
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
          {/* <button type="button" onClick={() => {}}>
            <Image src="/images/heart.svg" alt="Cart" width={24} height={24} priority />
          </button> */}
          <button type="button" onClick={() => {}} className='text-sm py-2 px-3 border border-gray-600 bg-gray-300/50 rounded-xl hover:-translate-y-0.5 transition-transform duration-300'>
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  )
}
