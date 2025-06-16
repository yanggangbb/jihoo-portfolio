"use client"

import type React from "react"
import { motion } from "framer-motion"
import { CalendarClock, Code, Shield, Microscope } from "lucide-react"

interface TimelineItem {
  title: string
  organization: string
  period: string
  description: string
  icon: React.ReactNode
  color: string
}

const timelineItems: TimelineItem[] = [
  {
    title: "Vulnerability Research & Exploitation",
    organization: "화이트햇 스쿨 3기",
    period: "2025",
    description:
      "취약점 분석을 집중적으로 학습하였고, 상용 소프트웨어의 실제 보안 취약점을 찾아내는 프로젝트를 수행하며 실전 분석 역량을 강화하였습니다.",
    icon: <Microscope className="h-6 w-6" />,
    color: "from-cyan-500 to-cyan-400",
  },
  {
    title: "Advanced Ethical Hacking Training",
    organization: "현대오토에버 화이트해커 양성 프로그램",
    period: "2024",
    description:
      "웹 해킹, 애플리케이션 해킹, 네트워크 해킹, 침해사고 대응 등 다양한 보안 분야를 폭넓게 학습하였으며, 화이트해커 경진대회에서 대상을 수상하였습니다.",
    icon: <Shield className="h-6 w-6" />,
    color: "from-emerald-500 to-emerald-400",
  },
  {
    title: "Backend Development & Engineering",
    organization: "서울디지텍고등학교",
    period: "2023 – 2025",
    description:
      "학교 수업을 통해 개발을 배우고, 1팀 1기업 프로젝트, 공모전, 대회 등에 참여하며 백엔드 개발 역량을 키웠습니다.",
    icon: <Code className="h-6 w-6" />,
    color: "from-blue-500 to-blue-400",
  },
  {
    title: "Cybersecurity Foundations",
    organization: "서울디지텍고등학교",
    period: "2023 – 2025",
    description:
      "해킹보안 동아리 ROOT에 가입하여 C언어, 네트워크, 리눅스를 중심으로 해킹의 기초를 학습하며 보안 분야에 입문하였습니다.",
    icon: <CalendarClock className="h-6 w-6" />,
    color: "from-purple-500 to-purple-400",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

const lineVariants = {
  hidden: { height: 0 },
  show: {
    height: "100%",
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
}

export default function WorkTimeline() {
  const getEndColor = (gradientString: string) => {
    const parts = gradientString.split(" ")
    const toColor = parts.find((part) => part.startsWith("to-"))
    if (toColor) {
      const colorName = toColor.replace("to-", "")
      switch (colorName) {
        case "cyan-400":
          return "#22d3ee"
        case "emerald-400":
          return "#34d399"
        case "blue-400":
          return "#60a5fa"
        case "purple-400":
          return "#a78bfa"
        default:
          return "#ffffff"
      }
    }
    return "#ffffff"
  }

  return (
    <motion.div
      className="relative"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {/* 중앙 타임라인 선 */}
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-zinc-800">
        <motion.div
          className="w-full bg-gradient-to-b from-cyan-500 via-emerald-500 to-purple-500"
          variants={lineVariants}
        />
      </div>

      <div className="space-y-12">
        {timelineItems.map((timelineItem, index) => (
          <motion.div key={index} className="relative flex w-full items-start justify-between" variants={item}>
            {/* Left side content or spacer */}
            <div className={`w-full md:w-[45%] ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
              {index % 2 === 0 ? (
                <motion.div
                  className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 shadow-md"
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl font-bold text-white">{timelineItem.title}</h3>
                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
                      {timelineItem.period}
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-zinc-400">{timelineItem.organization}</p>
                  <p className="text-zinc-300">{timelineItem.description}</p>
                </motion.div>
              ) : (
                <div className="hidden md:block h-full" />
              )}
            </div>

            {/* Central Icon */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br p-2 shadow-lg"
              style={{
                background: `linear-gradient(to bottom right, ${timelineItem.color.split(" ")[0]}, ${timelineItem.color.split(" ")[1]})`,
              }}
              // Removed whileHover effect
            >
              <div
                className="rounded-full bg-zinc-900 p-2 text-white border-2"
                style={{ borderColor: getEndColor(timelineItem.color) }}
              >
                {timelineItem.icon}
              </div>
            </motion.div>

            {/* Right side content or spacer */}
            <div className={`w-full pl-16 md:w-[45%] ${index % 2 !== 0 ? "md:pl-12" : "md:pr-12"}`}>
              {index % 2 !== 0 ? (
                <motion.div
                  className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 shadow-md"
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl font-bold text-white">{timelineItem.title}</h3>
                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
                      {timelineItem.period}
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-zinc-400">{timelineItem.organization}</p>
                  <p className="text-zinc-300">{timelineItem.description}</p>
                </motion.div>
              ) : (
                <div className="hidden md:block h-full" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
