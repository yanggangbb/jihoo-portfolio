"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, BadgeIcon as Certificate, X } from "lucide-react"

interface Achievement {
  title: string
  type: "certificate" | "award"
  year?: string
  description?: string
  image?: string // 이미지 파일명
}

const achievements: Achievement[] = [
  // 자격증
  { title: "정보처리기능사", type: "certificate", description: "한국산업인력공단", image: "정보처리기능사.png" },
  { title: "공간정보융합기능사", type: "certificate", description: "한국산업인력공단", image: "공간정보융합기능사.png" },
  { title: "리눅스마스터2급", type: "certificate", description: "한국정보통신진흥협회", image: "리눅스마스터2급.png" },
  { title: "ITQ OA Master", type: "certificate", description: "한국생산성본부", image: "ITQ_OA_Master.jpg" },
  { title: "IEQ지도사", type: "certificate", description: "한국생산성본부", image: "IEQ지도사.png" },
  { title: "IDCL Professional", type: "certificate", description: "IDCL Korea", image: "IDCL_Professional.jpg" },
  { title: "해킹보안전문가 3급", type: "certificate", description: "한국해킹보안협회", image: "해킹보안전문가3급.jpg" },

  // 수상경력
  { title: "공간정보 소프트웨어 해커톤", type: "award", year: "2024", description: "서울디지텍고등학교 [최우수상]", image: "공간정보_해커톤.jpg" },
  { title: "SW동행 데모데이", type: "award", year: "2024", description: "과학기술정보통신부 [대상], 한국교육방송공사 [특별상]", image: "SW동행_데모데이.jpg" },
  { title: "화이트해커 경진대회", type: "award", year: "2024", description: "교육부 [대상], 현대오토에버 [특별상]", image: "화이트해커_경진대회.jpg" },
  { title: "서울특별시 공간정보 활용 공모전", type: "award", year: "2024", description: "서울특별시 [우수상]", image: "서울공모전.jpg" },
  { title: "제2회 정보보호 골든벨", type: "award", year: "2024", description: "한국인터넷진흥원 [3등]", image: "정보보호골든벨.png" },
  { title: "공간정보 웹앱 경진대회", type: "award", year: "2024", description: "서울디지텍고등학교 [대상]", image: "웹앱_경진대회.png" },
  { title: "공간정보 포트폴리오 경진대회", type: "award", year: "2024", description: "서울디지텍고등학교 [대상]", image: "포트폴리오_경진대회.png" },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

interface AchievementCardProps {
  achievement: Achievement
  onClick: () => void
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, onClick }) => {
  const isAward = achievement.type === "award"

  return (
    <motion.div
      className={`rounded-lg border p-4 transition-all duration-300 hover:scale-105 cursor-pointer ${
        isAward
          ? "border-yellow-900/50 bg-yellow-900/10 hover:border-yellow-700"
          : "border-blue-900/50 bg-blue-900/10 hover:border-blue-700"
      }`}
      variants={item}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className={`rounded-full p-2 ${isAward ? "bg-yellow-900/30" : "bg-blue-900/30"}`}>
          {isAward ? (
            <Trophy className={`h-5 w-5 text-yellow-400`} />
          ) : (
            <Certificate className={`h-5 w-5 text-blue-400`} />
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-white">{achievement.title}</h4>
          {achievement.year && <p className="text-sm text-zinc-400">{achievement.year}</p>}
          {achievement.description && <p className="mt-1 text-sm text-zinc-300">{achievement.description}</p>}
        </div>
      </div>
    </motion.div>
  )
}

export default function AchievementsSection() {
  const certificates = achievements.filter((item) => item.type === "certificate")
  const awards = achievements.filter((item) => item.type === "award")

  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedAchievement(null)
      }
    }

    const handleScroll = () => {
      if (selectedAchievement) {
        setSelectedAchievement(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [selectedAchievement])

  return (
    <>
      <div className="grid gap-12 md:grid-cols-2">
        {/* 자격증 */}
        <div>
          <motion.div
            className="mb-6 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Certificate className="h-6 w-6 text-blue-400" />
            <h3 className="text-2xl font-bold text-blue-400">Certifications</h3>
          </motion.div>
          <motion.div
            className="space-y-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {certificates.map((cert, index) => (
              <AchievementCard
                key={index}
                achievement={cert}
                onClick={() => setSelectedAchievement(cert)}
              />
            ))}
          </motion.div>
        </div>

        {/* 수상경력 */}
        <div>
          <motion.div
            className="mb-6 flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Trophy className="h-6 w-6 text-yellow-400" />
            <h3 className="text-2xl font-bold text-yellow-400">Awards</h3>
          </motion.div>
          <motion.div
            className="space-y-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {awards.map((award, index) => (
              <AchievementCard
                key={index}
                achievement={award}
                onClick={() => setSelectedAchievement(award)}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedAchievement && selectedAchievement.image && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              className="relative p-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative inline-block">
                <img
                  src={`/images/achievements/${selectedAchievement.image}`}
                  alt={selectedAchievement.title}
                  className="w-auto h-[70vw] max-h-[70vh] object-contain rounded-lg shadow-lg"
                />
                <button
                  className="absolute top-0 right-0 translate-x-full text-white rounded-full p-1 hover:text-red-400"
                  onClick={() => setSelectedAchievement(null)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
