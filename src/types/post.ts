export interface Post {
  id: number
  title: string
  created_at: Date
  authorName: string
  tags: string
  body: string
  slug: string
  status: 'DRAFT' | 'PUBLISHED'
  cover: string
}

export interface Posts {
  posts: Post[]
  page: number
}
