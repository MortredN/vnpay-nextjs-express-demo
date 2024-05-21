export async function register({ email, password }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  return res.json()
}

export async function login({ email, password }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  return res.json()
}
