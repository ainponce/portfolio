"use client"

import Image from "next/image"
import { motion } from "framer-motion"

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

const arrowVariants = {
  initial: { x: 0, y: 0 },
  hover: { x: 2, y: -2, transition: { duration: 0.2 } },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <motion.div
        className="flex flex-col items-start max-w-xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Image - left aligned */}
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
          <br />I apply my own judgment to build products that not only function well, but have a clear purpose and feel
          honest.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="relative z-20 flex items-center justify-center gap-4 md:gap-6 w-full mt-8 md:mt-10"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="relative z-30 inline-flex items-center text-black text-xs md:text-sm font-normal px-2 py-2 cursor-pointer hover:opacity-70"
              whileHover="hover"
              initial="initial"
            >
              <span className="mr-0.5">{link.name}</span>
              <motion.span className="inline-block" variants={arrowVariants}>
                ↗
              </motion.span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </main>
  )
}
