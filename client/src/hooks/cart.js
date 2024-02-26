export async function getShoppingCart() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/cart`, {
    credentials: 'include'
  })
  return res.json()
}

export async function checkCartSession() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/cart/check`, {
    credentials: 'include'
  })
  return res.json()
}

export async function addProductToCart(productId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/cart/add`, {
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/cart/update-quantity`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId, quantity })
  })
  return res.json()
}
