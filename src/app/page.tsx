import { PostsSection } from '@/components/posts-section'

export default function Home() {
  return (
    <div className="">
      <h1 className="mb-6 text-2xl font-semibold">Postagens recentes</h1>
      <PostsSection />
    </div>
  )
}
