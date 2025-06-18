"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag, Clock, FileText, Grid3X3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
// getPostBySlug 임포트 제거
import { FadeInSection, SlideInSection } from "@/components/scroll-animations"
import type { PostMeta } from "@/lib/mdx" // PostMeta 타입 임포트

interface PostPageClientProps {
  content: string
  meta: PostMeta
}

export default function PostPageClient({ content, meta }: PostPageClientProps) {
  // 페이지 로드 시 맨 위로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // 간단한 마크다운을 HTML로 변환하는 함수
  const convertMarkdownToHtml = (markdown: string) => {
    return markdown
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mb-6 mt-8 text-white">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mb-4 mt-8 text-white">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mb-3 mt-6 text-white">$1</h3>')
      .replace(/^- (.*$)/gim, '<li class="mb-2 text-zinc-300 ml-4">• $1</li>')
      .replace(/^(\d+)\. (.*$)/gim, '<li class="mb-2 text-zinc-300 ml-4">$1. $2</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-zinc-200">$1</em>')
      .replace(/```[\s\S]*?```/g, (match) => {
        const codeContent = match.replace(/```\w*\n?/, "").replace(/```$/, "")
        return `<pre class="bg-zinc-900 border border-zinc-800 rounded-lg p-4 my-6 overflow-x-auto"><code class="text-zinc-300 text-sm font-mono leading-relaxed">${codeContent}</code></pre>`
      })
      .replace(/`(.*?)`/g, '<code class="bg-zinc-800 text-cyan-400 px-2 py-1 rounded text-sm font-mono">$1</code>')
      .replace(/\n\n/g, '</p><p class="mb-4 text-zinc-300 leading-relaxed">')
      .replace(/^(?!<[h|l|p|c])(.*$)/gim, '<p class="mb-4 text-zinc-300 leading-relaxed">$1</p>')
  }

  const htmlContent = convertMarkdownToHtml(content)
  const estimatedReadTime = Math.ceil(content.split(" ").length / 200) // 분당 200단어 기준

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "보안":
        return "bg-cyan-900/30 text-cyan-400 border-cyan-900/50"
      case "개발":
        return "bg-emerald-900/30 text-emerald-400 border-emerald-900/50"
      default:
        return "bg-zinc-800/50 text-zinc-400 border-zinc-700"
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-emerald-500/5"></div>
        <div className="relative mx-auto max-w-4xl">
          <FadeInSection>
            <div className="mb-8 flex items-center justify-center">
              <Link href="/posts" className="group">
                <div className="flex items-center gap-3 rounded-full border border-zinc-700/50 bg-zinc-900/50 px-6 py-3 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-zinc-800/50 hover:shadow-lg hover:shadow-emerald-500/10">
                  <div className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 p-2">
                    <Grid3X3 className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-zinc-300 transition-colors group-hover:text-white">
                    모든 글 보기
                  </span>
                  <ArrowLeft className="h-4 w-4 text-zinc-400 transition-all duration-300 group-hover:text-emerald-400 group-hover:-translate-x-1" />
                </div>
              </Link>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="mb-8">
              {/* Meta Info */}
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <Badge variant="outline" className={`${getCategoryBadgeColor(meta.category)} border`}>
                  <Tag className="mr-1 h-3 w-3" />
                  {meta.category}
                </Badge>
                <div className="flex items-center text-sm text-zinc-500">
                  <Calendar className="mr-1 h-4 w-4" />
                  {meta.date}
                </div>
                <div className="flex items-center text-sm text-zinc-500">
                  <Clock className="mr-1 h-4 w-4" />
                  {estimatedReadTime}분 읽기
                </div>
              </div>

              {/* Title */}
              <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl">
                <span className="bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                  {meta.title}
                </span>
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-zinc-400 leading-relaxed">{meta.excerpt}</p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SlideInSection>
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50">
              <img src={meta.imageUrl || "/placeholder.svg"} alt={meta.title} className="h-full w-full object-cover" />
            </div>
          </SlideInSection>
        </div>
      </section>

      {/* Article Content */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <FadeInSection delay={0.2}>
            <article
              className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-zinc-300 prose-strong:text-white prose-code:text-cyan-400 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </FadeInSection>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <FadeInSection delay={0.3}>
            <div className="flex items-center justify-center">
              <Link href="/posts" className="group">
                <div className="flex items-center gap-4 rounded-2xl border border-zinc-700/50 bg-gradient-to-r from-zinc-900/80 to-zinc-800/80 px-8 py-4 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 hover:scale-105">
                  <div className="rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 p-3">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white transition-colors group-hover:text-cyan-400">
                      다른 글 보기
                    </div>
                    <div className="text-sm text-zinc-400">더 많은 인사이트를 확인해보세요</div>
                  </div>
                  <ArrowLeft className="h-5 w-5 text-zinc-400 transition-all duration-300 group-hover:text-cyan-400 group-hover:-translate-x-1" />
                </div>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </main>
  )
}
