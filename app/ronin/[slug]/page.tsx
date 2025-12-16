import { getAllSlugs, getPostBySlug, getAllPosts } from "@/lib/posts-data"
import RoninPostClient from "./ronin-post-client"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: "Post not found" }
  }

  return {
    title: `${post.title} | Ain Moises Ponce`,
    description: post.description,
  }
}

export default async function RoninPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const allPosts = getAllPosts()

  if (!post) {
    notFound()
  }

  return <RoninPostClient post={post} allPosts={allPosts} currentSlug={slug} />
}
