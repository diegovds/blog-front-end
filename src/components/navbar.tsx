'use client'

import { Menu, X } from 'lucide-react'
import { useCookies } from 'next-client-cookies'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const cookies = useCookies()

  const isAuthenticated = cookies.get('token')

  const linkClasses = (path: string) =>
    `${pathname === path ? 'font-bold underline' : ''}`

  return (
    <nav className="bg-blue-700 text-zinc-200">
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-xl font-semibold">
            Blog
          </Link>

          {/* Botão mobile */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Links - desktop */}
          <div className="hidden gap-6 md:flex">
            <Link href="/" className={linkClasses('/')}>
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className={linkClasses('/dashboard')}>
                  Dashboard
                </Link>
                <Link href="/" onClick={() => cookies.remove('token')}>
                  Sair
                </Link>
              </>
            ) : (
              <Link href="/auth/signin" className={linkClasses('/auth/signin')}>
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Links - mobile */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${isOpen ? 'max-h-40 scale-100 opacity-100' : 'max-h-0 scale-95 opacity-0'} `}
        >
          <div className="flex flex-col gap-4 py-2">
            <Link
              href="/"
              className={linkClasses('/')}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className={linkClasses('/dashboard')}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link href="/" onClick={() => cookies.remove('token')}>
                  Sair
                </Link>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className={linkClasses('/auth/signin')}
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
