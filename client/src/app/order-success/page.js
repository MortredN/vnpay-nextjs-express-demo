'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function OrderSuccessPage() {
  const { success, message } = useSearchParams()

  return (
    <div className="flex flex-col items-center gap-y-8 mt-8 w-full">
      <h2 className="text-2xl font-bold">{success ? `Mua hàng thành công` : `Có lỗi xảy ra`}</h2>
      <span className="text-lg">{message}</span>

      <Link href="/" className="font-medium underline">
        <span className="py-2 px-4 w-full bg-blue-900 rounded-lg mt-8">Bạn có nhu cầu mua thêm?</span>
      </Link>
    </div>
  )
}
