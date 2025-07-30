import { Post } from '@/types/post'
import Link from 'next/link'
import { Modal } from './modal'

interface DashboardPostProps {
  post: Post
  token: string
  reload: () => void
}

export function DashboardPost({ post, token, reload }: DashboardPostProps) {
  function reloadPosts() {
    reload()
  }

  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-lg bg-gray-800">
      <div className="bg-blue-700 px-4 py-4">
        <h3 className="line-clamp-2 text-base font-semibold text-balance">
          {post.title}
        </h3>
      </div>
      <p className="line-clamp-5 px-4 pt-4 text-sm text-balance">{post.body}</p>
      <p className="line-clamp-2 px-4 py-4 text-xs font-semibold text-balance">
        {post.tags}
      </p>
      <div className="mx-4 mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          <p
            className={`rounded-sm p-1.5 text-xs font-semibold duration-300 ${post.status === 'DRAFT' ? 'bg-zinc-500' : 'bg-green-900'}`}
          >
            {post.status === 'DRAFT' ? 'Rascunho' : 'Publicado'}
          </p>
          <Modal token={token} post={post} onReload={reloadPosts} />
        </div>
        {post.status === 'PUBLISHED' && (
          <Link
            className="rounded-sm bg-gray-900 px-2 py-1 text-sm duration-300 hover:bg-gray-950"
            href={`/posts/${post.slug}`}
          >
            Ler mais
          </Link>
        )}
      </div>
    </div>
  )
}
