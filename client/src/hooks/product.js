export async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/product`)
  return res.json()
}
