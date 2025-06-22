import { notFound } from 'next/navigation'
import PostPageClient from './PostPageClient'

interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const { slug } = params
    const postModule = await import(`@/content/${slug}.mdx`)
    const { metadata } = postModule
    const MDXContent = postModule.default

    return <PostPageClient content={<MDXContent />} meta={metadata} />
  } catch (error) {
    return notFound()
  }
}

export async function generateMetadata({ params }: PostPageProps) {
  try {
    const { slug } = params
    const postModule = await import(`@/content/${slug}.mdx`)
    const { metadata } = postModule

    return {
      title: metadata.title,
      description: metadata.excerpt,
    }
  } catch {
    return {
      title: 'Not Found',
      description: '해당 게시글을 찾을 수 없습니다.',
    }
  }
}
