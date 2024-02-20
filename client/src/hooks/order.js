export async function createPaymentUrl() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/vnpay/create_payment_url`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}
