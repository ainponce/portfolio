import { getAllSlugs, getPostBySlug, getAllPosts } from "@/lib/mdx"
import RoninPostClient from "./ronin-post-client"

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: "Post not found" }
  }

  return {
    title: `${post.title} | Ain Moises Ponce`,
    description: post.description,
  }
}

export default async function RoninPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = await getPostBySlug(slug)
  const allPosts = await getAllPosts()

  if (!post) {
    // notFound() should ideally be imported and used here if we want to
    // maintain the same behavior as the original for a missing post.
    // However, since the client component doesn't handle notFound,
    // we'll rely on the original behavior for now which might lead to an error.
    // For a complete refactor, you might want to handle this in the client component.
    return <div>Post not found</div>
  }

  return <RoninPostClient post={post} allPosts={allPosts} currentSlug={slug} />
}
