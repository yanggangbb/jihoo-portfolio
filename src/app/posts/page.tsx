import { getAllPosts } from "@/lib/mdx" // src/lib/mdx에서 getAllPosts 임포트
import PostsPageClient from "./PostsPageClient" // 클라이언트 컴포넌트 임포트

export default function PostsPage() {
  const allPosts = getAllPosts()

  return <PostsPageClient initialPosts={allPosts} />
}
