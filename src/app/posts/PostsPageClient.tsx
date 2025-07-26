"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Filter, Calendar, Tag, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FadeInSection, ScaleInSection } from "@/components/scroll-animations"

interface PostMeta {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  imageUrl?: string
  hidden?: boolean
}

interface PostsPageClientProps {
  initialPosts: PostMeta[]
}

export default function PostsPageClient({ initialPosts }: PostsPageClientProps) {
  const visiblePosts = initialPosts.filter((post) => !post.hidden)

  const [posts, setPosts] = useState(visiblePosts)
  const [filteredPosts, setFilteredPosts] = useState(visiblePosts)
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [searchQuery, setSearchQuery] = useState("")

  // 페이지 로드 시 맨 위로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // 카테고리 및 검색 필터링
  useEffect(() => {
    let filtered = posts

    // 카테고리 필터링
    if (selectedCategory !== "전체") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    // 검색 필터링
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredPosts(filtered)
  }, [selectedCategory, searchQuery, posts])

  const categories = ["전체", "보안", "개발", "기타"]
  const categoryColors = {
    전체: "bg-gradient-to-r from-cyan-500 to-emerald-500",
    보안: "bg-gradient-to-r from-cyan-500 to-blue-500",
    개발: "bg-gradient-to-r from-emerald-500 to-green-500",
    기타: "bg-gradient-to-r from-purple-500 to-pink-500",
  }

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "보안":
        return "bg-cyan-900/30 text-cyan-400 border-cyan-900/50"
      case "개발":
        return "bg-emerald-900/30 text-emerald-400 border-emerald-900/50"
      case "기타":
        return "bg-purple-900/30 text-purple-400 border-purple-900/50"
      default:
        return "bg-zinc-800/50 text-zinc-400 border-zinc-700"
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-emerald-500/10"></div>
        <div className="relative mx-auto max-w-5xl">
          <FadeInSection>
            <div className="mb-8 flex items-center justify-center">
              <Link href="/" className="group">
                <div className="flex items-center gap-3 rounded-full border border-zinc-700/50 bg-zinc-900/50 px-6 py-3 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:bg-zinc-800/50 hover:shadow-lg hover:shadow-cyan-500/10">
                  <div className="rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 p-2">
                    <Home className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-zinc-300 transition-colors group-hover:text-white">
                    홈으로 돌아가기
                  </span>
                  <ArrowLeft className="h-4 w-4 text-zinc-400 transition-all duration-300 group-hover:text-cyan-400 group-hover:-translate-x-1" />
                </div>
              </Link>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="text-center">
              <h1 className="mb-6 text-5xl font-extrabold sm:text-6xl">
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Blog
                </span>
              </h1>
              <div className="mx-auto mb-6 h-1 w-32 rounded bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
              <p className="mx-auto max-w-2xl text-xl text-zinc-400">
                보안 연구와 개발에 관한 인사이트를 공유합니다. 실무 경험과 학습 과정을 통해 얻은 지식을 나누고 있습니다.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <FadeInSection delay={0.2}>
            <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                <Input
                  type="text"
                  placeholder="블로그 글 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-zinc-400" />
              <span className="text-sm font-medium text-zinc-300">카테고리:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`
                    transition-all duration-300 hover:scale-105
                    ${
                      selectedCategory === category
                        ? `${categoryColors[category as keyof typeof categoryColors]} text-white border-transparent shadow-lg`
                        : "border-zinc-700 bg-zinc-800/30 text-zinc-300 hover:bg-zinc-700/50 hover:text-white"
                    }
                  `}
                >
                  {category}
                  <Badge variant="secondary" className="ml-2 bg-white/20 text-white text-xs px-2 py-0.5">
                    {category === "전체" ? posts.length : posts.filter((post) => post.category === category).length}
                  </Badge>
                </Button>
              ))}
            </div>
          </FadeInSection>

          {/* Results Info */}
          <FadeInSection delay={0.3}>
            <div className="mb-8 flex items-center justify-between">
              <p className="text-zinc-400">
                <span className="font-semibold text-white">{filteredPosts.length}개</span>의 글을 찾았습니다
                {searchQuery && (
                  <span className="ml-2">
                    '<span className="text-cyan-400">{searchQuery}</span>' 검색 결과
                  </span>
                )}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory("전체")
                  setSearchQuery("")
                }}
                className="text-zinc-400 hover:text-white"
              >
                {(selectedCategory !== "전체" || searchQuery) ? "필터 초기화" : ""}
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <ScaleInSection key={post.slug} delay={index * 0.1}>
                  <Link href={`/posts/${post.slug}`} className="group block">
                    <article className="h-full overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-900/40 backdrop-blur-sm transition-all duration-500 hover:border-zinc-700 hover:shadow-2xl hover:shadow-cyan-500/10 group-hover:scale-[1.02]">
                      {/* Image */}
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={post.imageUrl || "/placeholder.svg"}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Category & Date */}
                        <div className="mb-4 flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className={`${getCategoryBadgeColor(post.category)} border transition-colors`}
                          >
                            <Tag className="mr-1 h-3 w-3" />
                            {post.category}
                          </Badge>
                          <div className="flex items-center text-xs text-zinc-500">
                            <Calendar className="mr-1 h-3 w-3" />
                            {post.date}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="mb-3 text-xl font-bold leading-tight text-white transition-colors group-hover:text-cyan-400">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm leading-relaxed text-zinc-400 line-clamp-3">{post.excerpt}</p>

                        {/* Read More */}
                        <div className="mt-4 flex items-center text-sm font-medium text-cyan-400 transition-colors group-hover:text-cyan-300">
                          자세히 보기
                          <svg
                            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </article>
                  </Link>
                </ScaleInSection>
              ))}
            </div>
          ) : (
            <FadeInSection>
              <div className="text-center py-16">
                <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-zinc-800/50 flex items-center justify-center">
                  <Search className="h-12 w-12 text-zinc-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">검색 결과가 없습니다</h3>
                <p className="text-zinc-400 mb-6">다른 키워드로 검색하거나 카테고리를 변경해보세요.</p>
                <Button
                  onClick={() => {
                    setSelectedCategory("전체")
                    setSearchQuery("")
                  }}
                  className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
                >
                  모든 글 보기
                </Button>
              </div>
            </FadeInSection>
          )}
        </div>
      </section>
    </main>
  )
}