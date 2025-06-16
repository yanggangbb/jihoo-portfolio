import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black px-4 py-12 text-center text-zinc-500 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex justify-center space-x-6">
          <Link href="https://github.com" className="hover:text-white">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://linkedin.com" className="hover:text-white">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="mailto:email@example.com" className="hover:text-white">
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
        <p>본 페이지는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.</p>
        <p>© {new Date().getFullYear()} Park, Ji-Hoo. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
