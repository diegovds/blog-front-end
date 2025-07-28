import { Post as P } from '@/types/post'
import Link from 'next/link'

export function Post(post: P) {
  return (
    <div className="flex w-full flex-col justify-between overflow-hidden rounded-lg bg-gray-800 md:w-60">
      <h3 className="bg-blue-700 px-4 pt-4 pb-4 text-base font-semibold">
        {post.title}
      </h3>
      <p className="line-clamp-5 px-4 pt-4 text-sm text-zinc-200">
        {post.body}
      </p>
      <p className="px-4 py-4 text-xs font-semibold">{post.tags}</p>
      <Link
        className="mx-4 mb-4 w-fit place-self-end rounded-sm bg-gray-900 px-2 py-1 text-sm duration-300 hover:bg-gray-950"
        href={`/posts/${post.slug}`}
      >
        Ler mais
      </Link>
    </div>
  )
}
