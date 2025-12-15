"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { BookingWidget } from "@/components/booking-widget"

const RONIN_RED = "#B91C1C"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
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

const socialLinks = [
  { name: "X", href: "https://x.com/ainponce" },
  { name: "GitHub", href: "https://github.com/ainponce" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/ainponce/" },
  { name: "Mail", href: "mailto:ponce.ain@gmail.com" },
]

export default function Home() {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const handleRoninClick = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      router.push("/ronin")
    }, 2000)
  }

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ backgroundColor: "rgba(185, 28, 28, 0)" }}
            animate={{ backgroundColor: RONIN_RED }}
            transition={{
              duration: 2,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        )}
      </AnimatePresence>

      <BookingWidget isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <motion.div
          className="flex flex-col items-start max-w-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
            }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer mb-6 md:mb-8"
          >
            <Image
              src="/images/katana.png"
              alt="Katana sword with sheath"
              width={60}
              height={60}
              className="object-contain"
            />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-serif text-2xl md:text-4xl text-black tracking-tight mb-4 md:mb-6"
          >
            Ain Moises Ponce
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-black text-sm md:text-base leading-relaxed text-center w-full pointer-events-none"
          >
            Product Engineer focused on the intention behind the code.
            <br />
            <br />I approach every project with discipline, seeking to clear the noise to leave only the essentials.
            <br />
            <br />I apply my own judgment to build products that not only function well, but have a clear purpose and
            feel honest.
          </motion.p>

          <motion.div variants={itemVariants} className="flex justify-center w-full mt-8 md:mt-10">
            <motion.div
              onClick={handleRoninClick}
              className="font-serif text-base md:text-xl text-black cursor-pointer px-4 py-2 underline"
              whileHover={{ color: RONIN_RED }}
              transition={{ duration: 1 }}
            >
              The Way of The Ronin
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 md:gap-6 w-full mt-4 md:mt-8"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="text-black text-xs md:text-sm font-normal cursor-pointer transition-opacity hover:opacity-60"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.button
              onClick={() => setIsBookingOpen(true)}
              className="text-black text-xs md:text-sm font-normal cursor-pointer transition-opacity hover:opacity-60"
            >
              Calendar
            </motion.button>
          </motion.div>
        </motion.div>
      </main>
    </>
  )
}
