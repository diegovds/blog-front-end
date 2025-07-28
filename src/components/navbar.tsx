import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="flex justify-center gap-6 bg-blue-800 py-3">
      <Link href={`/`}>Home</Link>
      <Link href={`/dashboard`}>Dashboard</Link>
      <Link href={`/login`}>Login</Link>
    </nav>
  )
}
