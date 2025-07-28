'use client'

import { PostsData } from '@/types/post'
import { useQuery } from '@tanstack/react-query'
import { Post } from './post'

export function PostsSection() {
  const { data, isLoading, error } = useQuery<PostsData['data']>({
    queryKey: ['get-posts'],
    queryFn: async (): Promise<PostsData['data']> => {
      const url = `${process.env.NEXT_PUBLIC_HOST_URL}/api/posts`

      const response = await fetch(url)
      const json = await response.json()

      if (!response.ok) {
        throw new Error('Erro ao buscar posts')
      }

      return json.data
    },
    refetchInterval: 60000, // refetch a cada 60 segundos
  })

  if (isLoading) {
    return (
      <div className="mt-5">
        <p className="text-center text-gray-700">Carregando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-5">
        <p className="text-center text-gray-700">Erro ao carregar dados.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto grid w-fit gap-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {data && data.posts.map((post) => <Post key={post.id} {...post} />)}
    </div>
  )
}
