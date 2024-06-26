import Orders from '@/components/Orders'

export default async function OrdersPage() {
  return (
    <div className="flex flex-col items-center gap-y-8 mt-8 w-full">
      <h2 className="text-2xl font-bold">Đơn hàng</h2>
      <Orders />
    </div>
  )
}
