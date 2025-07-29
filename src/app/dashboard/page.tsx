import api from '@/lib/axios'
import { Auth } from '@/types/auth'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (!token) redirect('/auth/signin')

  const auth = await api
    .get<Auth>('/auth/validate', {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err.response.data.message)
    })

  if (!auth) redirect('/auth/signin')

  return {
    title: `Dashboard de ${auth.user.name}`,
    description: `Dashboard de ${auth.user.name} no blog.`,
  }
}

export default async function Dashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (!token) redirect('/auth/signin')

  const auth = await api
    .get<Auth>('/auth/validate', {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err.response.data.message)
    })

  if (!auth) redirect('/auth/signin')

  return <div>Olá {auth.user.name}</div>
}
