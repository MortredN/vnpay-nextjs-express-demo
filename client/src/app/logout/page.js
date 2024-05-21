'use client'

import { useEffect } from 'react'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const Logout = () => {
  useEffect(() => {
    cookies.remove('_vnpaydemo_jwt')
    window.location.replace('/')
  }, [])

  return <></>
}
export default Logout
