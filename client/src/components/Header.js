'use client'

import Link from 'next/link'
import UserOptions from './UserOptions'
import Image from 'next/image'
import ShoppingCartCounter from './ShoppingCartCounter'

const Header = ({ jwt }) => {
  return (
    <header className="flex justify-center relative p-2 md:p-4 w-full">
      <Link href="/">
        <h1 className="text-3xl font-bold">Demo Shop</h1>
      </Link>
      <div className="absolute md:top-4 right-0 md:right-4 flex items-center justify-right gap-x-4">
        <UserOptions jwt={jwt} />
        <Link href="/cart" className="flex w-9 h-9 items-center justify-center relative">
          <Image src="/images/cart.svg" alt="Cart" width={32} height={32} priority />
          <ShoppingCartCounter />
        </Link>
      </div>
    </header>
  )
}
export default Header
