import fs from "fs"
import path from "path"
import matter from "gray-matter"

const CONTENT_DIR = path.join(process.cwd(), "content/ronin")

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  order: number
}

export interface Post extends PostMeta {
  content: string
}

export async function getAllPosts(): Promise<PostMeta[]> {
  // Ensure directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith(".mdx"))

  const posts = files.map((file) => {
    const slug = file.replace(".mdx", "")
    const filePath = path.join(CONTENT_DIR, file)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data } = matter(fileContent)

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      description: data.description || "",
      order: data.order || 0,
    }
  })

  // Sort by order (ascending)
  return posts.sort((a, b) => a.order - b.order)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    description: data.description || "",
    order: data.order || 0,
    content,
  }
}

export async function getAllSlugs(): Promise<string[]> {
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith(".mdx"))
  return files.map((file) => file.replace(".mdx", ""))
}
