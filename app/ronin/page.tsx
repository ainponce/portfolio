"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { getAllPosts, type Post } from "@/lib/posts-data"

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

export default function RoninIndexPage() {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isIndexExpanded, setIsIndexExpanded] = useState(false)
  const posts: Post[] = getAllPosts()

  useEffect(() => {
    document.documentElement.classList.add("ronin-bg")
    document.documentElement.style.backgroundColor = RONIN_RED
    document.body.style.backgroundColor = RONIN_RED
    document.documentElement.classList.add("ronin-scrollbar")
    document.documentElement.classList.add("ronin-selection")

    return () => {
      document.documentElement.classList.remove("ronin-bg")
      document.documentElement.style.backgroundColor = ""
      document.body.style.backgroundColor = ""
      document.documentElement.classList.remove("ronin-scrollbar")
      document.documentElement.classList.remove("ronin-selection")
    }
  }, [])

  const handleReturnClick = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      router.push("/")
    }, 2000)
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
            initial={{ backgroundColor: "rgba(185, 28, 28, 0)" }}
            animate={{ backgroundColor: "#ffffff" }}
            transition={{
              duration: 2,
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
      ></motion.aside>

      <main className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: RONIN_RED }}>
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
                  {posts.map((post) => (
                    <motion.li key={post.slug} variants={itemVariants}>
                      <Link
                        href={`/ronin/${post.slug}`}
                        className="text-black text-sm font-normal hover:opacity-60 transition-opacity"
                      >
                        {post.title}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-2xl md:text-4xl text-black tracking-tight mb-4 md:mb-6 w-full text-left"
          >
            Ronin
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-black text-sm md:text-base leading-relaxed text-center w-full"
          >
            A collection of personal writings and reflections.
          </motion.p>

          {/* Posts List */}
          <motion.div variants={itemVariants} className="w-full mt-8 space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/ronin/${post.slug}`}
                className="block text-black hover:opacity-60 transition-opacity"
              >
                <h2 className="text-lg font-serif">{post.title}</h2>
                <p className="text-sm opacity-70">{post.description}</p>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </>
  )
}
