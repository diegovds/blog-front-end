import { Post } from '@/types/post'
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
      <div className="place-self-end">
        <Modal token={token} post={post} onReload={reloadPosts} />
      </div>
    </div>
  )
}
