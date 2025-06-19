// src/lib/mdx.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content");

export interface PostMeta {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  slug: string;
  award: string;
}

export function getPostBySlug(slug: string): { content: string; meta: PostMeta } {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    content: content.trim(),
    meta: {
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      category: data.category,
      imageUrl: data.imageUrl || "/placeholder.svg",
      award: data.award,
      slug,
    },
  };
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(contentDirectory);

  return files
    .filter(file => file.endsWith(".mdx"))
    .map(file => {
      const slug = file.replace(/\.mdx$/, "");
      return getPostBySlug(slug).meta;
    });
}

// ✅ 슬러그만 반환하는 함수 추가
export async function getAllSlugs(): Promise<string[]> {
  const files = fs.readdirSync(contentDirectory);
  return files
    .filter(file => file.endsWith(".mdx"))
    .map(file => file.replace(/\.mdx$/, ""));
}
