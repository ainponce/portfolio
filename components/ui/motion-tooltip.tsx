"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MotionTooltipProps {
    content: string
    children: React.ReactNode
}

export default function MotionTooltip({ content, children }: MotionTooltipProps) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div
            className="relative flex items-center justify-center w-fit"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onFocus={() => setIsVisible(true)}
            onBlur={() => setIsVisible(false)}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8, translateX: "-50%" }}
                        animate={{ opacity: 1, y: 0, scale: 1, translateX: "-50%" }}
                        exit={{ opacity: 0, y: 10, scale: 0.8, translateX: "-50%" }}
                        transition={{ duration: 0.2 }}
                        className="absolute -top-12 left-1/2 px-3 py-1.5 bg-zinc-800 text-white text-xs rounded-md whitespace-nowrap z-50 pointer-events-none lowercase"
                    >
                        {content}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-800 rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
