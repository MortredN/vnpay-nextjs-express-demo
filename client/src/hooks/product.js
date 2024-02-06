export async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/product`)
  return res.json()
}

export async function getShoppingCart() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/product/cart`, {
    credentials: 'include'
  })
  return res.json()
}

export async function addProductToCart(productId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/product/add-cart`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId })
  })
  return res.json()
}

export async function updateShoppingCartItemQuantity(productId, quantity) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/product/update-cart-quantity`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId, quantity })
  })
  return res.json()
}
