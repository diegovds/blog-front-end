import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { QueryClientContext } from '@/providers/queryclient'
import type { Metadata } from 'next'
import { CookiesProvider } from 'next-client-cookies/server'
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
  title: {
    default: 'Blog',
    template: '%s | Blog',
  },
  description: 'Blog.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950 text-zinc-200 antialiased`}
      >
        <QueryClientContext>
          <CookiesProvider>
            <div className="flex min-h-dvh flex-col gap-6">
              <Navbar />
              <main className="container mx-auto flex flex-1 px-3">
                {children}
              </main>
              <Footer />
            </div>
          </CookiesProvider>
        </QueryClientContext>
      </body>
    </html>
  )
}
