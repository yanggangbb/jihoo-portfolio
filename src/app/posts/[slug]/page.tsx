import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import PostPageClient from './PostPageClient'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { content, meta } = getPostBySlug(params.slug)

  return <PostPageClient content={content} meta={meta} />
}
