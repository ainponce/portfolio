"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"

const RONIN_RED = "#B91C1C"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

interface Post {
  slug: string
  title: string
  date: string
  description: string
  order: number
  content: string
}

interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  order: number
}

export default function RoninPostPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isIndexExpanded, setIsIndexExpanded] = useState(false)
  const [post, setPost] = useState<Post | null>(null)
  const [allPosts, setAllPosts] = useState<PostMeta[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.documentElement.style.backgroundColor = RONIN_RED
    document.body.style.backgroundColor = RONIN_RED
    document.documentElement.classList.add("ronin-scrollbar")
    document.documentElement.classList.add("ronin-selection")

    // Fetch current post and all posts for index
    Promise.all([
      fetch(`/api/ronin/posts/${slug}`).then((res) => res.json()),
      fetch("/api/ronin/posts").then((res) => res.json()),
    ])
      .then(([postData, postsData]) => {
        setPost(postData)
        setAllPosts(postsData)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })

    return () => {
      document.documentElement.style.backgroundColor = ""
      document.body.style.backgroundColor = ""
      document.documentElement.classList.remove("ronin-scrollbar")
      document.documentElement.classList.remove("ronin-selection")
    }
  }, [slug])

  const handleReturnClick = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      router.push("/ronin")
    }, 1000)
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: RONIN_RED }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-black text-sm">
          Loading...
        </motion.div>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: RONIN_RED }}>
        <div className="text-black text-center">
          <h1 className="text-2xl font-serif mb-4">Post not found</h1>
          <Link href="/ronin" className="text-sm hover:opacity-60 transition-opacity">
            Return to index
          </Link>
        </div>
      </main>
    )
  }

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none"
        style={{ backgroundColor: RONIN_RED }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0.4, 0, 0.2, 1],
        }}
      />

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ backgroundColor: RONIN_RED }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        )}
      </AnimatePresence>

      {/* Desktop Index - Left Column */}
      <motion.aside
        className="hidden md:block fixed left-8 lg:left-16 top-1/2 -translate-y-1/2 z-40"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
      </motion.aside>

      <main className="min-h-screen flex items-center justify-center px-6 py-12" style={{ backgroundColor: RONIN_RED }}>
        <motion.div
          className="flex flex-col items-center max-w-xl w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header with Return and Index toggle */}
          <motion.div
            variants={itemVariants}
            className="mb-6 md:mb-8 h-[60px] flex items-center justify-between w-full"
          >
            <motion.span
              onClick={handleReturnClick}
              className="text-black text-sm font-normal cursor-pointer"
              whileHover={{ opacity: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              Return
            </motion.span>

            
          </motion.div>

          {/* Mobile Index - Expandable */}
          <AnimatePresence>
            {isIndexExpanded && (
              <motion.div
                className="md:hidden w-full mb-6"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={containerVariants}
              >
                <motion.ul className="space-y-3 text-center">
                  {allPosts.map((p) => (
                    <motion.li key={p.slug} variants={itemVariants}>
                      <Link
                        href={`/ronin/${p.slug}`}
                        className={`text-black text-sm font-normal hover:opacity-60 transition-opacity ${
                          p.slug === slug ? "opacity-100" : "opacity-50"
                        }`}
                      >
                        {p.title}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Post Title */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-2xl md:text-4xl text-black tracking-tight mb-4 md:mb-6 w-full text-left"
          >
            {post.title}
          </motion.h1>

          {/* Post Content */}
          <motion.div
            variants={itemVariants}
            className="text-black text-sm md:text-base leading-relaxed text-center w-full prose prose-sm prose-neutral max-w-none"
          >
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-4">{children}</p>,
                em: ({ children }) => <em className="italic">{children}</em>,
                strong: ({ children }) => <strong className="font-bold">{children}</strong>,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </motion.div>
        </motion.div>
      </main>
    </>
  )
}
