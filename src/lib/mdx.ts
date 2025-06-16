import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDirectory = path.join(process.cwd(), "src/content")

export interface PostMeta {
  title: string
  date: string
  excerpt: string
  category: string
  imageUrl: string
  slug: string
}

export function getPostBySlug(slug: string): { content: string; meta: PostMeta } {
  try {
    // 슬러그 검증
    if (!slug || typeof slug !== "string") {
      throw new Error("Invalid slug provided")
    }

    // 경로 보안 검증
    if (slug.includes("..") || slug.includes("/") || slug.includes("\\")) {
      throw new Error("Invalid slug format")
    }

    const filePath = path.join(contentDirectory, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
      throw new Error(`Post file not found: ${slug}`)
    }

    const fileContents = fs.readFileSync(filePath, "utf8")

    if (!fileContents.trim()) {
      throw new Error(`Post file is empty: ${slug}`)
    }

    // 간단한 matter 파싱
    const matterResult = matter(fileContents)
    const data = matterResult.data
    const content = matterResult.content

    if (!content.trim()) {
      throw new Error(`Post content is empty: ${slug}`)
    }

    // 필수 메타데이터 검증
    if (!data.title || !data.date || !data.excerpt || !data.category) {
      throw new Error(`Missing required metadata for: ${slug}`)
    }

    return {
      content: content.trim(),
      meta: {
        title: String(data.title),
        date: String(data.date),
        excerpt: String(data.excerpt),
        category: String(data.category),
        imageUrl: String(data.imageUrl || "/placeholder.svg"),
        slug,
      },
    }
  } catch (error) {
    console.error(`Error reading MDX file for slug: ${slug}`, error)
    throw error
  }
}

export function getAllPosts(): PostMeta[] {
  try {
    if (!fs.existsSync(contentDirectory)) {
      console.warn(`Content directory does not exist: ${contentDirectory}`)
      return []
    }

    const files = fs.readdirSync(contentDirectory)
    const posts: PostMeta[] = []

    for (const file of files) {
      if (!file.endsWith(".mdx")) {
        continue
      }

      const slug = file.replace(/\.mdx$/, "")
      try {
        const { meta } = getPostBySlug(slug)
        posts.push(meta)
      } catch (error) {
        console.error(`Error processing post: ${slug}`, error)
        // 개별 포스트 오류는 무시하고 계속 진행
      }
    }

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error getting all posts", error)
    return []
  }
}
