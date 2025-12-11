"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const RONIN_RED = "#B91C1C"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3, // Reduced delay since overlay fades faster now
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

export default function RoninPage() {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    document.documentElement.style.backgroundColor = RONIN_RED
    document.body.style.backgroundColor = RONIN_RED
    document.documentElement.classList.add("ronin-scrollbar")

    return () => {
      document.documentElement.style.backgroundColor = ""
      document.body.style.backgroundColor = ""
      document.documentElement.classList.remove("ronin-scrollbar")
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
          delay: 0.1, // Small delay to ensure page is ready
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

      <main className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: RONIN_RED }}>
        <motion.div
          className="flex flex-col items-start max-w-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Return - left aligned above title, same height as katana (60px) */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8 h-[60px] flex items-center mt-[46px]">
            <motion.span
              onClick={handleReturnClick}
              className="text-black text-sm font-normal cursor-pointer mx-0"
              whileHover={{ opacity: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              Return
            </motion.span>
          </motion.div>

          {/* Title - left aligned like main page */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-2xl md:text-4xl text-black tracking-tight mb-4 md:mb-6"
          >
            The Way of The Ronin
          </motion.h1>

          {/* Story content - centered like description on main page */}
          <motion.div
            variants={itemVariants}
            className="text-black text-sm md:text-base leading-relaxed text-center w-full space-y-4"
          >
            <p>
              In this short piece, I want to share how I started on this path of hard work and creation. I'm writing
              this from a place of deep appreciation, and I hope you enjoy reading it as much as I enjoyed writing it.
            </p>

            <p>
              I don't come from a wealthy or politically connected family. Most of my relatives have always worked as
              employees, following orders to put food on the table and maintain a false sense of stability. That mindset
              never sat right with me. Whether it's innate or learned, I've always had a tendency to question authority.
            </p>

            <p>
              That same temperament often landed me in turbulent situations that I probably could have avoided. Between
              my age, lack of experience, and a hunger to "take on the world," I didn't know how to pick my battles so I
              fought them all. That approach brought me to where I am today. I may not be in the perfect spot, but I'm
              certainly not in a bad one, and I'm proud to have kept my identity intact.
            </p>

            <p>
              Being independent doesn't mean I can't be a team player or follow a leader. On the contrary, I thrive in
              team dynamics where open dialogue invites reflection and mutual learning. Whether with peers or former
              bosses, I believe that when we leave our egos at the door, we all have something to learn.
            </p>

            <p>
              In 2025, I decided to use social media, specifically X, to connect with the Argentine tech community. To
              my surprise, the builder, startup, and tech ecosystem is massive, filled with incredible people and
              projects. Connecting with them was one of the best decisions of my life (right up there with starting
              BJJ). Soaking up other people's experiences has helped me grow immensely, and I hope they've learned
              something from me, too.
            </p>

            <p>
              I participated in many hackathons, and to no one's surprise, I didn't win or even place in any of them.
              But failure never discouraged me, it fueled my drive to improve personally and professionally. It felt
              like doors would shut just as I approached them, but I didn't mind. I just ended up forcing them open.
            </p>

            <p>
              The future looks promising. Big things are coming, and I'll be as ready as I can be. I hope this gives you
              a better sense of who I am. Writing this certainly helped me realize exactly where I stand and where I'm
              headed.
            </p>

            <p className="italic">News soon.</p>

            <p className="font-serif mt-6 mb-6">– Ain Moises Ponce</p>
          </motion.div>
        </motion.div>
      </main>
    </>
  )
}
