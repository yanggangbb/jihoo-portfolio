import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail, User, Globe, AtSign } from "lucide-react"
import { FaDiscord } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import SkillsSection from "@/components/skills-section"
import { HeroAnimation } from "@/components/hero-animation"
import { FadeInSection, SlideInSection, ScaleInSection } from "@/components/scroll-animations"
import WorkTimeline from "@/components/work-timeline"
import AchievementsSection from "@/components/achievements-section"
import { getAllPosts } from "@/lib/mdx" 
import SideNav from "@/components/SideNav"

export default async function Home() {
  const allPosts = await getAllPosts()

  // 메인페이지에 표시할 문서들
  const projectSlugs = [
    "2024-codegate-open-ctf-write-up",
    "open-cpn-0day-analysis",
    "ai-room-bot",
    "dbase",
    "dlab",
  ]
  const blogSlugs = ["2024-codegate-open-ctf-write-up", "secure-coding-practices"]

  const securityProjects = allPosts.filter((post) => post.category === "보안" && projectSlugs.includes(post.slug))
  const webAppProjects = allPosts.filter((post) => post.category === "개발" && projectSlugs.includes(post.slug))
  const blogPosts = allPosts.filter((post) => blogSlugs.includes(post.slug))

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
      {/* <SideNav /> */}
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <HeroAnimation />
        </div>
        <div className="relative z-10 flex w-full max-w-5xl flex-col items-center space-y-8 text-center">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 text-base font-bold tracking-wide backdrop-blur-sm">
              <div className="rounded-full bg-zinc-800/50 px-4 py-1">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">Hacker</span>
              </div>
              <div className="rounded-full bg-zinc-800/50 px-4 py-1">
                <span className="bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
                  Developer
                </span>
              </div>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                JiHoo's Portfolio
              </span>
            </h1>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <p className="max-w-3xl text-xl text-zinc-400 leading-relaxed">
              소프트웨어 취약점 분석과 보안에 관심이 많은 고등학생입니다. 0day 및 1day 취약점 분석과 웹/앱 개발
              프로젝트를 통해 보안 전문가로 성장하고 있습니다.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-transparent px-6 py-3 text-base font-medium text-white"
              >
                <Link href="#projects">
                  <span className="flex items-center gap-2">프로젝트 보기
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full bg-transparent px-6 py-3 text-base font-medium text-white border-none"
              >
                <Link href="#contact">
                  <span>연락하기</span>
                </Link>
              </Button>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.4}>
            <div className="mt-8 flex items-center justify-center gap-6">
              <Link href="https://github.com/yanggangbb" className="text-zinc-400 transition-colors hover:text-white">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="mailto:yanggang0424@gmail.com" className="text-zinc-400 transition-colors hover:text-white">
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </FadeInSection>
        </div>
        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
          <div className="flex animate-bounce flex-col items-center">
            <span className="text-sm text-zinc-500">스크롤 하세요</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-zinc-500"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-zinc-900 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SlideInSection>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <div className="mx-auto h-1 w-24 rounded bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
            </div>
          </SlideInSection>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* 프로필 사진 및 개인정보 */}
            <FadeInSection delay={0.1}>
              <div className="flex flex-col items-center space-y-6">
                {/* 프로필 사진 */}
                <div className="relative">
                  <div className="h-48 w-48 overflow-hidden rounded-full border-4 p-1 profile-border-gradient">
                    {" "}
                    {/* 클래스 변경 */}
                    <div className="h-full w-full overflow-hidden rounded-full bg-zinc-800">
                      <img src="/images/profile.png" alt="Park Ji Hoo Profile" className="h-full w-full object-cover" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 p-3">
                    <User className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* 개인정보 */}
                <div className="w-full max-w-sm space-y-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-cyan-400" />
                    <div>
                      <p className="text-sm text-zinc-400">Full Name</p>
                      <p className="font-medium text-white">Park Ji Hoo</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <AtSign className="h-5 w-5 text-emerald-400" />
                    <div>
                      <p className="text-sm text-zinc-400">Nickname</p>
                      <p className="font-medium text-white">Yanggang</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-sm text-zinc-400">Hacker Name</p>
                      <p className="font-medium text-white">N1n0x</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="text-sm text-zinc-400">Email</p>
                      <a href="mailto:yanggang0424@gmail.com" className="font-medium text-white hover:text-cyan-400">
                        yanggang0424@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-zinc-400">Website</p>
                      <a
                        href="https://jihoo-portfolio.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-white hover:text-cyan-400"
                      >
                        yanggang-blog
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* 오른쪽: WHO AM I? */}
            <FadeInSection delay={0.2}>
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">WHO AM I?</h3>
                <div className="space-y-4">
                  <p className="text-zinc-300 leading-relaxed">
                    보안, 특히 소프트웨어 취약점 분석에 깊은 관심을 가진 고등학생입니다. 0day 및 1day 취약점을 분석하는
                    프로젝트를 진행하며 보안 전문가로서의 역량을 키우고 있습니다.
                  </p>
                  <p className="text-zinc-300 leading-relaxed">
                    현재 웹/앱 개발 분야를 전공하는 고등학교에 재학 중이며, 다양한 웹 개발 프로젝트를 통해 기술적 기반을
                    다지고 있습니다. 이러한 개발 경험은 보안 취약점을 더 깊이 이해하는 데 큰 도움이 되고 있습니다.
                  </p>
                  <p className="text-zinc-300 leading-relaxed">
                    저의 목표는 소프트웨어 취약점 분석 전문가가 되어 디지털 세계를 더 안전하게 만드는 것입니다. 특히
                    0day 취약점 발견과 분석에 집중하여 사이버 보안 분야에서 의미 있는 기여를 하고 싶습니다.
                  </p>
                  <p className="text-zinc-300 leading-relaxed">
                    개발과 보안 지식을 결합하여 보안에 강한 소프트웨어를 개발하는 방법론을 연구하고, 이를 통해 더 안전한
                    디지털 환경 구축에 기여하고자 합니다.
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Work Timeline Section */}
      <section id="timeline" className="bg-black px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SlideInSection>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Work Timeline
                </span>
              </h2>
              <div className="mx-auto h-1 w-24 rounded bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
              <p className="mt-6 text-lg text-zinc-400">보안 및 개발 분야에서의 경험과 성장 과정입니다.</p>
            </div>
          </SlideInSection>

          <WorkTimeline />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-zinc-900 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SlideInSection>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
              <div className="mx-auto h-1 w-24 rounded bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
              <p className="mt-6 text-lg text-zinc-400">보안 연구와 웹/앱 개발 분야의 주요 프로젝트입니다.</p>
            </div>
          </SlideInSection>

          <div className="mb-16">
            <FadeInSection>
              <h3 className="mb-6 text-center text-2xl font-bold text-cyan-400">보안 프로젝트</h3>
            </FadeInSection>
            <div className="grid gap-8 md:grid-cols-2">
              {securityProjects.map((post, index) => (
                <ScaleInSection key={post.slug} delay={index * 0.1}>
                  <ProjectCard
                    title={post.title}
                    description={post.excerpt}
                    tags={[post.category]} // Using category as a tag, adjust if you have specific tags in MDX
                    link={`/posts/${post.slug}`}
                    imageUrl={post.imageUrl}
                    featured={true} // Assuming security projects are featured
                  />
                </ScaleInSection>
              ))}
            </div>
          </div>

          <div>
            <FadeInSection>
              <h3 className="mb-6 text-center text-2xl font-bold text-emerald-400">웹/앱 개발 프로젝트</h3>
            </FadeInSection>
            <div className="grid gap-8 md:grid-cols-3">
              {webAppProjects.map((post, index) => (
                <ScaleInSection key={post.slug} delay={index * 0.1}>
                  <ProjectCard
                    title={post.title}
                    description={post.excerpt}
                    tags={[post.category]} // Using category as a tag, adjust if you have specific tags in MDX
                    link={`/posts/${post.slug}`}
                    imageUrl={post.imageUrl}
                  />
                </ScaleInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-black px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SlideInSection>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Skills
                </span>
              </h2>
              <div className="mx-auto h-1 w-24 rounded bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
              <p className="mt-6 text-lg text-zinc-400">보안 연구와 개발에 활용하는 주요 기술 스택입니다.</p>
            </div>
          </SlideInSection>

          <SkillsSection />
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="bg-zinc-900 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SlideInSection>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Certifications & Awards
                </span>
              </h2>
              <div className="mx-auto h-1 w-24 rounded bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
              <p className="mt-6 text-lg text-zinc-400">보안 및 개발 분야에서 취득한 자격증과 수상 경력입니다.</p>
            </div>
          </SlideInSection>

          <AchievementsSection />
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="bg-black px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SlideInSection>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Blog
                </span>
              </h2>
              <div className="mx-auto h-1 w-24 rounded bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
              <p className="mt-6 text-lg text-zinc-400">보안 연구와 개발에 관한 글을 공유합니다.</p>
            </div>
          </SlideInSection>

          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post, index) => (
              <ScaleInSection key={post.slug} delay={index * 0.1}>
                <Link href={`/posts/${post.slug}`} className="group">
                  <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:border-cyan-900 hover:bg-zinc-900">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={post.imageUrl || "/placeholder.svg"}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-2 text-sm text-cyan-400">{post.date}</div>
                      <h3 className="mb-2 text-xl font-bold">{post.title}</h3>
                      <p className="text-zinc-400">{post.excerpt}</p>
                    </div>
                  </div>
                </Link>
              </ScaleInSection>
            ))}
          </div>

          <FadeInSection delay={0.3}>
            <div className="mt-10 text-center">
              <Button asChild variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
                <Link href="/posts">모든 글 보기</Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-zinc-900 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SlideInSection>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Contact
                </span>
              </h2>
              <div className="mx-auto h-1 w-24 rounded bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
              <p className="mt-6 text-lg text-zinc-400">프로젝트 협업이나 질문이 있으시면 연락해주세요.</p>
            </div>
          </SlideInSection>

          <div className="grid gap-8 md:grid-cols-1 justify-items-center">
            <ScaleInSection delay={0.1}>
              <div className="space-y-6 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                <h3 className="text-xl font-bold">연락처 정보</h3>
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-cyan-400" />
                  <a href="mailto:yanggang0424@gmail.com" className="text-zinc-300 hover:text-white">
                    yanggang0424@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Github className="h-5 w-5 text-cyan-400" />
                  <a
                    href="https://github.com/yanggangbb/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white"
                  >
                    github.com/yanggangbb
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <FaDiscord size={20} color="#22d3ee" />
                  <a href="https://discord.com/users/1007530866534273064" target="_blank" className="text-zinc-300 hover:text-white">
                    yanggang0724_
                  </a>
                </div>
              </div>
            </ScaleInSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black px-4 py-12 text-center text-zinc-500 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex justify-center space-x-6">
            <Link href="https://github.com/yanggangbb" className="hover:text-white">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="mailto:yanggang0424@gmail.com" className="hover:text-white">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
          <p>본 페이지는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.</p>
          <p>© {new Date().getFullYear()} Park, Ji-Hoo. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  )
}
