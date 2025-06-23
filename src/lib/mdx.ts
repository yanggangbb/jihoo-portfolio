import fs from "fs"
import path from "path"

const contentDirectory = path.join(process.cwd(), "src/content")

export interface PostMeta {
  title: string
  date: string
  excerpt: string
  category: string
  imageUrl: string
  slug: string
  award: string
}

// mdx 파일을 동적 import해서 metadata와 컴포넌트를 가져옴
export async function getPostBySlug(slug: string): Promise<{ content: React.FC; meta: PostMeta }> {
  const postModule = await import(`../content/${slug}.mdx`)
  return {
    content: postModule.default,
    meta: postModule.metadata,
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = fs.readdirSync(contentDirectory).filter((file) => file.endsWith(".mdx"))

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "")
      const postModule = await import(`../content/${slug}.mdx`)
      return { ...postModule.metadata, slug }
    }),
  )

  return posts
}

export async function getAllSlugs(): Promise<string[]> {
  const files = fs.readdirSync(contentDirectory).filter((file) => file.endsWith(".mdx"))
  return files.map((file) => file.replace(/\.mdx$/, ""))
}
