import { Tags } from '@/components/tags'
import { Post } from '@/types/post'
import { formatDate } from '@/utils/format'
import { Calendar1, CircleUserRound } from 'lucide-react'
import Image from 'next/image'

interface PostProps {
  post: Post
}

export function PostDetail({ post }: PostProps) {
  return (
    <div className="flex flex-3 flex-col gap-6 place-self-start overflow-hidden rounded-lg bg-gray-800 p-4">
      <h2 className="text-xl font-semibold text-balance md:text-2xl">
        {post.title}
      </h2>
      <div className="flex justify-between text-xs">
        <div className="flex items-center gap-1">
          <CircleUserRound size={20} className="rounded-full bg-gray-900" />
          <p>{post.authorName}</p>
        </div>
        <div className="flex items-center gap-1">
          <Calendar1 size={20} className="rounded-sm bg-gray-900" />
          <p>{formatDate(post.created_at)}</p>
        </div>
      </div>
      <div className="relative aspect-video w-full place-self-center overflow-hidden rounded-sm bg-zinc-300 md:w-125">
        {post.cover && (
          <Image
            src={post.cover}
            alt="Imagem da postagem"
            quality={100}
            priority
            fill
          />
        )}
      </div>
      <p className="md:base text-sm">{post.body}</p>
      <Tags tags={post.tags} />
    </div>
  )
}
