import { Post } from '@/types/post'
import Link from 'next/link'
import { Modal } from './modal'

interface DashboardPostProps {
  post: Post
  token: string
}

export function DashboardPost({ post, token }: DashboardPostProps) {
  return (
    <div className="flex min-h-[256px] flex-col overflow-hidden rounded-lg bg-gray-800">
      <div className="bg-blue-700 px-4 py-4">
        <h3 className="line-clamp-1 text-base font-semibold text-balance">
          {post.title}
        </h3>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <p className="line-clamp-5 px-4 pt-4 text-sm text-balance">
          {post.body}
        </p>
        <p className="line-clamp-2 px-4 py-4 text-xs font-semibold text-balance">
          {post.tags}
        </p>
      </div>
      <div className="mx-4 mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          <p
            className={`rounded-sm px-2 py-1 text-xs duration-300 md:text-sm ${post.status === 'DRAFT' ? 'bg-zinc-500' : 'bg-green-900'}`}
          >
            {post.status === 'DRAFT' ? 'Rascunho' : 'Publicado'}
          </p>
          <Modal token={token} post={post} create={false} />
        </div>
        {post.status === 'PUBLISHED' && (
          <Link
            className="rounded-sm bg-gray-900 px-2 py-1 text-xs duration-300 hover:bg-gray-950 md:text-sm"
            href={`/posts/${post.slug}`}
          >
            Ler mais
          </Link>
        )}
      </div>
    </div>
  )
}
