'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const UserOptions = ({ jwt }) => {
  const [showOptions, setShowOptions] = useState(false)

  return (
    <div className="flex w-9 h-9 items-center justify-center relative">
      {jwt ? (
        <>
          <button type="button" onClick={() => setShowOptions((value) => !value)}>
            <Image src="/images/user.svg" alt="User" width={32} height={32} priority />
          </button>
          {showOptions && (
            <div className="bg-white rouned-lg flex flex-col items-start absolute right-6 top-6">
              <Link href="/orders" className="p-2 pr-6">
                Orders
              </Link>
              <span className="w-full h-px bg-black" />
              <Link href="/logout" className="p-2 pr-6">
                Logout
              </Link>
            </div>
          )}
        </>
      ) : (
        <Link href="/login">
          <Image src="/images/key.svg" alt="Login" width={32} height={32} priority />
        </Link>
      )}
    </div>
  )
}
export default UserOptions
