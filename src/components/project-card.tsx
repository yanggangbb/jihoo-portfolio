import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  link: string
  imageUrl: string
  featured?: boolean
}

export default function ProjectCard({ title, description, tags, link, imageUrl, featured = false }: ProjectCardProps) {
  return (
    <Link href={link} className="group">
      <div
        className={cn(
          "overflow-hidden rounded-lg border bg-zinc-900/50 transition-all duration-300 hover:bg-zinc-900",
          featured ? "border-cyan-900/50 hover:border-cyan-700" : "border-zinc-800 hover:border-zinc-700",
        )}
      >
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className={cn("mb-2 text-xl font-bold", featured ? "text-cyan-400" : "text-white")}>{title}</h3>
          <p className="mb-4 text-zinc-400">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className={cn("border-zinc-700 bg-zinc-800/50", featured && "border-cyan-900/50 bg-cyan-900/10")}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
