import { Navbar } from '@/components/navbar'
import { QueryClientContext } from '@/providers/queryclient'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Blog',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} container mx-auto bg-gray-900 px-3 text-zinc-200 antialiased`}
      >
        <QueryClientContext>
          <div className="flex min-h-dvh flex-col gap-6">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="">Footer</footer>
          </div>
        </QueryClientContext>
      </body>
    </html>
  )
}
