export interface Post {
  id: number
  title: string
  createdAt: Date
  authorName: string
  tags: string
  body: string
  slug: string
}

export interface Posts {
  posts: Post[]
  page: number
}

export interface PostsData {
  data: Posts
}
