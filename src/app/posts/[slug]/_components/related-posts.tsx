import { Post } from '@/components/posts-section/post'
import { Post as P } from '@/types/post'

interface RelatedPostsProps {
  posts: P[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <h2 className="text-lg font-semibold md:text-xl">
        Postagens relacionados
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  )
}
