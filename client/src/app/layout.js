import { Inter } from 'next/font/google'
import './globals.css'
import { cookies } from 'next/headers'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VNPay Shop Template',
  description: 'Created using Next.js & Express'
}

export default function RootLayout({ children }) {
  const cookieStore = cookies()
  const jwt = cookieStore.get('_vnpaydemo_jwt')?.value

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col items-center p-4 md:p-8 max-w-[1920px]">
          <Header jwt={jwt} />
          {children}
        </main>
      </body>
    </html>
  )
}
