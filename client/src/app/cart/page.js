import ShoppingCart from '@/components/ShoppingCart'

export default function CartPage() {
  return (
    <div className="flex flex-col items-center gap-y-8 mt-8 w-full">
      <h2 className="text-2xl font-bold">Giỏ hàng</h2>
      <ShoppingCart />
    </div>
  )
}
