import ProductCard from '@/components/ProductCard'

export default function Home() {
  const sampleProducts = [
    {
      id: 1,
      name: 'Sản phẩm A',
      image:
        'https://images.pexels.com/photos/4829069/pexels-photo-4829069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      price: 50000
    },
    {
      id: 2,
      name: 'Sản phẩm B',
      image:
        'https://images.pexels.com/photos/4829083/pexels-photo-4829083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      price: 100000
    },
    {
      id: 3,
      name: 'Sản phẩm C',
      image:
        'https://images.pexels.com/photos/4820654/pexels-photo-4820654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      price: 75000
    },
    {
      id: 4,
      name: 'Sản phẩm D',
      image:
        'https://images.pexels.com/photos/4829070/pexels-photo-4829070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      price: 60000
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 w-full mt-12">
      {sampleProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
