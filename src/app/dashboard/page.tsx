import { PostsSection } from '@/components/posts-section'
import api from '@/lib/axios'
import { Auth } from '@/types/auth'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Modal } from './_components/modal'

interface Props {
  searchParams: Promise<{ page: number | undefined }>
}

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

export default async function Dashboard({ searchParams }: Props) {
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

  const { page } = await searchParams

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="mb-6 flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold md:text-2xl">Dashboard</h1>
        <Modal create={true} token={token.value} />
      </div>
      <PostsSection
        page={!page ? 1 : page}
        url={`${process.env.NEXT_PUBLIC_HOST_URL}/api/admin/posts?page=`}
        token={token.value}
      />
    </div>
  )
}
