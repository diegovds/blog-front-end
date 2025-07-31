'use client'

import { DashboardPost } from '@/app/dashboard/_components/dashboard-post'
import api from '@/lib/axios'
import { useReloadStore } from '@/stores/useReloadStore'
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
  queryKey: string
}

export function PostsSection({
  url,
  page,
  token,
  queryKey,
}: PostsSectionProps) {
  const [npage, setNpage] = useState<number>(page)
  const [paginationButton, setPaginationButton] = useState(true)
  const { reload, toggleReload } = useReloadStore()

  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [queryKey, npage, url] })
  }, [queryClient, queryKey, npage, url])

  const getPosts = async (u: string) => {
    if (!token) {
      return await api.get<Posts>(u).then((response) => response.data)
    } else {
      return await api
        .get<Posts>(u, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data)
    }
  }

  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey, npage, url],
    queryFn: () => getPosts(`${url}${npage}`),
    refetchInterval: 60000, // refetch a cada 60 segundos
  })

  useEffect(() => {
    if (data && data.posts.length === 0 && npage > 1) {
      setNpage(npage - 1)
      setPaginationButton(false)
    }

    if (data && data.posts.length === 0 && npage < 1) {
      setNpage(npage + 1)
    }
  }, [npage, data])

  useEffect(() => {
    if (reload) {
      queryClient.invalidateQueries({ queryKey: [queryKey, npage, url] })
      toggleReload()
    }
  }, [queryClient, queryKey, npage, url, reload, toggleReload])

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
    <div className="flex h-full w-full flex-col justify-between">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {data &&
          !token &&
          data.posts.map((post) => <Post key={post.id} {...post} />)}
        {data &&
          token &&
          data.posts.map((post) => (
            <DashboardPost key={post.id} post={post} token={token} />
          ))}
      </div>
      {data && data.posts.length > 0 && paginationButton && (
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
      )}
    </div>
  )
}
