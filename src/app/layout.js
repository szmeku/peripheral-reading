import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Peripheral Reading',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" title={metadata.title}>
      <body>{children}</body>
    </html>
  )
}
