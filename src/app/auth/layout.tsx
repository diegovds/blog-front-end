import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (token) redirect('/dashboard')

  return <>{children}</>
}
