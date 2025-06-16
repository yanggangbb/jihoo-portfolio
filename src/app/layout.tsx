import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTopButton from "@/components/scroll-to-top-button" // 새로 추가된 컴포넌트 임포트

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JiHoo's Portfolio",
  description: "소프트웨어 취약점 분석과 보안에 관심이 많은 고등학생의 포트폴리오입니다.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <ScrollToTopButton /> {/* 모든 페이지에 표시될 버튼 추가 */}
        </ThemeProvider>
      </body>
    </html>
  )
}
