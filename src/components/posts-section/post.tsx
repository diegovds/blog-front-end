import { Post as P } from '@/types/post'
import Image from 'next/image'
import Link from 'next/link'

export function Post(post: P) {
  return (
    <div className="flex min-h-[256px] flex-col overflow-hidden rounded-lg bg-gray-800">
      <div className="relative mb-2 aspect-video w-full bg-zinc-300">
        <h3 className="absolute top-4 left-4 z-10 mr-4 line-clamp-1 w-fit rounded-sm bg-blue-700/80 px-2 py-0 text-base font-semibold text-balance">
          {post.title}
        </h3>
        {post.cover && (
          <div className="relative aspect-video w-full">
            <Image
              src={post.cover}
              alt="Imagem da postagem"
              quality={100}
              priority
              fill
            />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <p className="line-clamp-5 px-4 pt-4 text-sm text-balance">
          {post.body}
        </p>
        <p className="line-clamp-2 px-4 py-4 text-xs font-semibold text-balance">
          {post.tags}
        </p>
      </div>
      <Link
        className="mx-4 mb-4 w-fit place-self-end rounded-sm bg-gray-900 px-2 py-1 text-xs duration-300 hover:bg-gray-950 md:text-sm"
        href={`/posts/${post.slug}`}
      >
        Ler mais
      </Link>
    </div>
  )
}
