"use client"

import Link from "next/link"
import useActiveSection from "@/hooks/useActiveSection"

const sections = [
  { id: "main", label: "Main" },
  { id: "about", label: "About Me" },
  { id: "timeline", label: "Work Timeline" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Certifications & Awards" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
]

export default function SideNav() {
  const active = useActiveSection(sections.map((s) => s.id))

  return (
    <div className="fixed left-10 top-1/2 z-50 -translate-y-1/2 hidden lg:flex">
      <div className="relative flex flex-col items-center justify-center space-y-4 rounded-full bg-zinc-800/20 px-2 py-4 backdrop-blur-md">
        {sections.map((section) => (
          <Link
            key={section.id}
            href={`#${section.id}`}
            className="group relative flex h-4 w-4 items-center justify-center"
          >
            <span className="absolute left-5 z-10 hidden whitespace-nowrap rounded bg-black px-1.5 py-0.5 text-xs text-white shadow-md transition-opacity group-hover:inline-block group-hover:opacity-100">
              {section.label}
            </span>
            <span
              className={`block h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                active === section.id
                  ? "bg-gradient-to-r from-emerald-400 to-cyan-400 scale-110"
                  : "bg-zinc-500"
              } group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400`}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
