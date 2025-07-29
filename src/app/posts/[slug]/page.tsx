import api from '@/lib/axios'
import { Post as P } from '@/types/post'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostDetail } from './_components/post'
import { RelatedPosts } from './_components/related-posts'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params

  const post = await api
    .get<{ post: P }>(`/posts/${slug}`)
    .then((res) => res.data.post)
    .catch((err) => {
      console.log(err.response.data.message)
    })

  if (!post) {
    notFound()
  }

  return {
    title: post.title,
    description: post.body,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params

  const post = await api
    .get<{ post: P }>(`/posts/${slug}`)
    .then((res) => res.data.post)
    .catch((err) => {
      console.log(err.response.data.message)
    })

  const relatedPosts = await api
    .get<{ posts: P[] }>(`/posts/${slug}/related`)
    .then((res) => res.data.posts)
    .catch((err) => {
      console.log(err.response.data.message)
    })

  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-1 flex-col gap-6 md:flex-row lg:gap-14">
      <div className="flex-2">
        <PostDetail post={post} />
      </div>
      {relatedPosts !== undefined && <RelatedPosts posts={relatedPosts} />}
    </div>
  )
}
