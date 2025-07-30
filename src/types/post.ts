export interface Post {
  id: number
  title: string
  createdAt: Date
  authorName: string
  tags: string
  body: string
  slug: string
  status: string
}

export interface Posts {
  posts: Post[]
  page: number
}
