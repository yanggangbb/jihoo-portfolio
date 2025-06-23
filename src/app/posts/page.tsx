import { getAllPosts } from "@/lib/mdx"
import PostsPageClient from "./PostsPageClient"

export default async function PostsPage() {
  const allPosts = await getAllPosts()

  return <PostsPageClient initialPosts={allPosts} />
}
