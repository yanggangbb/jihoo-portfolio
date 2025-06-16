import { getAllPosts, getPostBySlug } from "@/lib/mdx" // getPostBySlug도 임포트
import PostPageClient from "./PostPageClient"
import { notFound } from "next/navigation" // notFound 임포트

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  try {
    const posts = getAllPosts()
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

export default function PostPage({ params }: PostPageProps) {
  const { slug } = params

  let content = ""
  let meta = null

  try {
    const postData = getPostBySlug(slug)
    content = postData.content
    meta = postData.meta
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error)
    notFound() // 데이터를 찾을 수 없거나 오류가 발생하면 404 페이지 표시
  }

  if (!meta) {
    notFound() // meta가 null인 경우도 404 처리
  }

  return <PostPageClient content={content} meta={meta} />
}
