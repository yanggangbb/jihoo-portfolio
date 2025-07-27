"use client"

import { useEffect, useState } from "react"

export default function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState("main")

  useEffect(() => {
    const handleScroll = () => {
      let current = "main"
      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            current = id
          }
        }
      }
      setActive(current)
    }

    handleScroll() // 초기값
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sectionIds])

  return active
}
