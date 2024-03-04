'use client'

import { useState } from 'react'

const Login = () => {
  const [loginOrRegister, setLoginOrRegister] = useState(`login`)

  return (
    <div className="flex flex-col items-center gap-12 mt-12">
      <h2 className="text-2xl font-bold">
        {loginOrRegister === `login` ? `Đăng nhập` : `Tạo tài khoản`}
      </h2>
      <form className="flex flex-col justify-center items-start w-[300px]">
        <label for="email" className="mb-2 font-medium">
          Email:
        </label>
        <input
          type="text"
          name="email"
          className="w-full mb-4 bg-sky-50 focus:bg-sky-100 focus:outline-sky-700 h-8 rounded-lg px-2 text-sm"
        />
        <label for="password" className="mb-2 font-medium">
          Mật khẩu:
        </label>
        <input
          type="password"
          name="password"
          className="w-full mb-4 bg-sky-50 focus:bg-sky-100 focus:outline-sky-700 h-8 rounded-lg px-2 text-sm"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-lg w-full"
        >
          {loginOrRegister === `login` ? `Đăng nhập` : `Đăng ký`}
        </button>
        <div className="mt-4 flex flex-row gap-x-1 justify-center w-full">
          <span>{loginOrRegister === `login` ? `Chưa có tài khoản?` : `Đã có tài khoản?`}</span>
          <button
            type="button"
            onClick={() =>
              setLoginOrRegister((value) => (value === `login` ? `register` : `login`))
            }
            className="text-sky-700 hover:text-sky-800 underline font-semibold"
          >
            {loginOrRegister === `login` ? `Đăng ký ngay` : `Đăng nhập ngay`}
          </button>
        </div>
      </form>
    </div>
  )
}
export default Login
