"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  // 스크롤 위치에 따라 버튼 가시성 업데이트
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        // 300px 이상 스크롤 시 버튼 표시
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  // 버튼 클릭 시 맨 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드러운 스크롤
    })
  }

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 rounded-full p-3 shadow-lg transition-all duration-300",
        "bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none", // 가시성에 따라 애니메이션 적용
      )}
      size="icon"
      aria-label="맨 위로 스크롤"
    >
      <ArrowUp className="h-6 w-6 text-white" />
    </Button>
  )
}
