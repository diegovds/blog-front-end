import { PostsSection } from '@/components/posts-section'

interface Props {
  searchParams: Promise<{ page: number | undefined }>
}

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams

  return (
    <div className="flex flex-1 flex-col items-center">
      <h1 className="mb-6 place-self-start text-xl font-semibold md:text-2xl">
        Postagens recentes
      </h1>
      <PostsSection
        page={!page ? 1 : page}
        url={`${process.env.NEXT_PUBLIC_HOST_URL}/api/posts?page=`}
        queryKey="get-posts"
      />
    </div>
  )
}
