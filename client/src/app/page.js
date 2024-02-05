import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/hooks/product'

export default async function Home() {
  const res = await getProducts()

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 w-full mt-12">
      {res?.data?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
