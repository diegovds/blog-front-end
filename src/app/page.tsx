import { PostsSection } from '@/components/posts-section'

interface Props {
  searchParams: Promise<{ page: number | undefined }>
}

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams

  return (
    <div className="">
      <h1 className="mb-6 text-2xl font-semibold">Postagens recentes</h1>
      <PostsSection
        page={!page ? 1 : page}
        url={`${process.env.NEXT_PUBLIC_HOST_URL}/api/posts?page=`}
      />
    </div>
  )
}
