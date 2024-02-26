import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Image from 'next/image'
import ShoppingCartCounter from '@/components/ShoppingCartCounter'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VNPay Shop Template',
  description: 'Created using Next.js & Express'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col items-center p-4 md:p-8 max-w-[1920px]">
          <div className="flex justify-center relative p-2 md:p-4 w-full">
            <Link href="/">
              <h1 className="text-3xl font-bold">Demo Shop</h1>
            </Link>
            <Link href="/cart" className="absolute w-9 h-9 md:top-4 right-0 md:right-4">
              <div className="flex w-full h-full items-center justify-center relative">
                <Image src="/images/cart.svg" alt="Cart" width={32} height={32} priority />
                <ShoppingCartCounter />
              </div>
            </Link>
          </div>
          {children}
        </main>
      </body>
    </html>
  )
}
