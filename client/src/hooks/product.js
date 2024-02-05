export async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/product`)
  return res.json()
}

export async function addProductToCart(productId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/product/add-cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId })
  })
  return res.json()
}
