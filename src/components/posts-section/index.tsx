'use client'

import api from '@/lib/axios'
import { Posts } from '@/types/post'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Post } from './post'

interface PostsSectionProps {
  url: string
  page: number
  token?: string
}

export function PostsSection({ url, page, token }: PostsSectionProps) {
  const [npage, setNpage] = useState<number>(page)

  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['get-posts', npage, url] })
  }, [queryClient, npage, url])

  const getPosts = async () => {
    if (!token) {
      return await api
        .get<Posts>(`${url}${npage}`)
        .then((response) => response.data)
    } else {
      return await api
        .get<Posts>(`${url}${npage}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data)
    }
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['get-posts', npage, url],
    queryFn: getPosts,
    refetchInterval: 60000, // refetch a cada 60 segundos
  })

  useEffect(() => {
    if (data && data.posts.length === 0 && npage > 1) {
      setNpage(npage - 1)
    }

    if (data && data.posts.length === 0 && npage < 1) {
      setNpage(npage + 1)
    }
  }, [npage, data])

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
    <>
      <div className="grid w-fit gap-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {data && data.posts.map((post) => <Post key={post.id} {...post} />)}
      </div>
      <div className="mt-6 flex gap-1 place-self-end">
        {npage > 1 && (
          <Button
            className="w-fit cursor-pointer rounded-sm bg-gray-800 px-2 py-1 text-sm duration-300 hover:bg-gray-950"
            onClick={() => {
              setNpage(npage - 1)
            }}
          >
            <ArrowBigLeft className="fill-zinc-200 text-zinc-200" />
          </Button>
        )}
        <Button
          className="w-fit cursor-pointer rounded-sm bg-gray-800 px-2 py-1 text-sm duration-300 hover:bg-gray-950"
          onClick={() => {
            setNpage(npage + 1)
          }}
        >
          <ArrowBigRight className="fill-zinc-200 text-zinc-200" />
        </Button>
      </div>
    </>
  )
}
