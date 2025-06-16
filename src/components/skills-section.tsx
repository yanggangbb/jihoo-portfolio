"use client"

import { useState } from "react"
import type React from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect } from "react"
import {
  Code,
  Terminal,
  Server,
  Braces,
  GitBranch,
  Box,
  Bug,
  Network,
  Database,
  Monitor,
  FileCode,
  Zap,
} from "lucide-react"

interface Skill {
  name: string
  level: number
  icon: React.ReactNode
  category: "languages" | "tools" | "others"
}

const skills: Skill[] = [
  // Languages & Framework
  { name: "C", level: 85, icon: <Code className="h-6 w-6" />, category: "languages" },
  { name: "C++", level: 80, icon: <FileCode className="h-6 w-6" />, category: "languages" },
  { name: "Python", level: 90, icon: <Terminal className="h-6 w-6" />, category: "languages" },
  { name: "JavaScript", level: 85, icon: <Braces className="h-6 w-6" />, category: "languages" },
  { name: "Flask", level: 75, icon: <Server className="h-6 w-6" />, category: "languages" },
  { name: "FastAPI", level: 70, icon: <Zap className="h-6 w-6" />, category: "languages" },

  // Tools
  { name: "Git", level: 90, icon: <GitBranch className="h-6 w-6" />, category: "tools" },
  { name: "Docker", level: 75, icon: <Box className="h-6 w-6" />, category: "tools" },
  { name: "IDA", level: 80, icon: <Bug className="h-6 w-6" />, category: "tools" },
  { name: "x64dbg", level: 75, icon: <Terminal className="h-6 w-6" />, category: "tools" },
  { name: "Burp Suite", level: 85, icon: <Network className="h-6 w-6" />, category: "tools" },
  { name: "WireShark", level: 80, icon: <Network className="h-6 w-6" />, category: "tools" },

  // Others
  { name: "MySQL", level: 80, icon: <Database className="h-6 w-6" />, category: "others" },
  { name: "Linux", level: 85, icon: <Monitor className="h-6 w-6" />, category: "others" },
]

interface CircularProgressProps {
  percentage: number
  size: number
  strokeWidth: number
  color: string
  delay: number
  isVisible: boolean
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size,
  strokeWidth,
  color,
  delay,
  isVisible,
}) => {
  const progress = useMotionValue(0)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI

  // Transform progress value to stroke-dashoffset
  const strokeDashoffset = useTransform(
    progress,
    [0, 100],
    [circumference, circumference - (circumference * percentage) / 100],
  )

  useEffect(() => {
    if (isVisible) {
      // Animate the circular progress
      const controls = animate(progress, percentage, {
        duration: 2,
        delay: delay,
        ease: "easeOut",
      })

      return () => {
        controls.stop()
      }
    }
  }, [isVisible, percentage, delay, progress])

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="absolute inset-0 -rotate-90 transform" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-zinc-800"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          className="drop-shadow-sm"
          style={{
            filter: `drop-shadow(0 0 6px ${color}40)`,
          }}
        />
      </svg>
    </div>
  )
}

interface SkillCardProps {
  skill: Skill
  index: number
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const [isVisible, setIsVisible] = useState(false)

  const getColorByCategory = (category: string) => {
    switch (category) {
      case "languages":
        return "#06b6d4" // cyan-500
      case "tools":
        return "#10b981" // emerald-500
      case "others":
        return "#8b5cf6" // violet-500
      default:
        return "#06b6d4"
    }
  }

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: index * 0.1,
          ease: "easeOut",
        },
      }}
      viewport={{ once: true, amount: 0.3 }}
      onViewportEnter={() => setIsVisible(true)}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
    >
      <div className="relative">
        <CircularProgress
          percentage={skill.level}
          size={80}
          strokeWidth={5}
          color={getColorByCategory(skill.category)}
          delay={index * 0.15 + 0.3}
          isVisible={isVisible}
        />

        {/* Icon in center */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, rotate: -180, scale: 0 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            rotate: isVisible ? 0 : -180,
            scale: isVisible ? 1 : 0,
          }}
          transition={{
            duration: 0.8,
            delay: index * 0.15,
            ease: "easeOut",
          }}
        >
          <div
            className="rounded-full bg-zinc-900 p-2 text-white shadow-lg border-2"
            style={{ borderColor: getColorByCategory(skill.category) + "40" }}
          >
            {skill.icon}
          </div>
        </motion.div>
      </div>

      {/* Skill name */}
      <motion.h4
        className="mt-3 text-center text-sm font-medium text-white"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 10,
        }}
        transition={{
          duration: 0.5,
          delay: index * 0.15 + 0.8,
          ease: "easeOut",
        }}
      >
        {skill.name}
      </motion.h4>
    </motion.div>
  )
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export default function SkillsSection() {
  const languageSkills = skills.filter((skill) => skill.category === "languages")
  const toolSkills = skills.filter((skill) => skill.category === "tools")
  const otherSkills = skills.filter((skill) => skill.category === "others")

  return (
    <div className="space-y-16">
      {/* Languages & Framework */}
      <div>
        <motion.h3
          className="mb-8 text-center text-2xl font-bold text-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Languages & Framework
        </motion.h3>
        <motion.div
          className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {languageSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Tools */}
      <div>
        <motion.h3
          className="mb-8 text-center text-2xl font-bold text-emerald-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Tools
        </motion.h3>
        <motion.div
          className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {toolSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index + languageSkills.length} />
          ))}
        </motion.div>
      </div>

      {/* Others */}
      <div>
        <motion.h3
          className="mb-8 text-center text-2xl font-bold text-violet-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Others
        </motion.h3>
        <motion.div
          className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {otherSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index + languageSkills.length + toolSkills.length} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
