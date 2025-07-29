import { Post as P } from '@/types/post'
import Link from 'next/link'

export function Post(post: P) {
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
      <Link
        className="mx-4 mb-4 w-fit place-self-end rounded-sm bg-gray-900 px-2 py-1 text-sm duration-300 hover:bg-gray-950"
        href={`/posts/${post.slug}`}
      >
        Ler mais
      </Link>
    </div>
  )
}
