'use client'

import { login, register } from '@/hooks/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const Login = () => {
  const router = useRouter()
  const jwt = cookies.get('_vnpaydemo_jwt')

  useEffect(() => {
    if (jwt) router.replace('/')
  }, [jwt])

  const [mode, setMode] = useState(`login`)
  const [email, setEmail] = useState(``)
  const [password, setPassword] = useState(``)

  const onModeChange = () => {
    setEmail(``)
    setPassword(``)
    setMode((value) => (value === `login` ? `register` : `login`))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return alert('Email is invalid')
    }

    let res = null
    if (mode === `login`) {
      res = await login({ email, password })
    } else {
      res = await register({ email, password })
    }

    if (res.success) {
      cookies.set('_vnpaydemo_jwt', res.data?.token)
      cookies.set('_vnpaydemo_cart_session_id', res.data?.sessionId)
      window.location.replace('/')
    } else {
      alert(res.message)
    }
  }

  return (
    <div className="flex flex-col items-center gap-12 mt-12">
      <h2 className="text-2xl font-bold">{mode === `login` ? `Đăng nhập` : `Tạo tài khoản`}</h2>
      <form onSubmit={onSubmit} className="flex flex-col justify-center items-start w-[300px]">
        <label for="email" className="mb-2 font-medium">
          Email:
        </label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 bg-sky-50 focus:bg-sky-100 focus:outline-sky-700 h-8 rounded-lg px-2 text-sm"
        />
        <label for="password" className="mb-2 font-medium">
          Mật khẩu:
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 bg-sky-50 focus:bg-sky-100 focus:outline-sky-700 h-8 rounded-lg px-2 text-sm"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-lg w-full"
        >
          {mode === `login` ? `Đăng nhập` : `Đăng ký`}
        </button>
        <div className="mt-4 flex flex-row gap-x-1 justify-center w-full">
          <span>{mode === `login` ? `Chưa có tài khoản?` : `Đã có tài khoản?`}</span>
          <button
            type="button"
            onClick={onModeChange}
            className="text-sky-700 hover:text-sky-800 underline font-semibold"
          >
            {mode === `login` ? `Đăng ký ngay` : `Đăng nhập ngay`}
          </button>
        </div>
      </form>
    </div>
  )
}
export default Login
