"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#F8FBFF] text-[#000D20]">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col items-center text-center">
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              duration: 0.8,
            }}
            className="relative mb-8 md:mb-12"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="text-6xl md:text-7xl font-bold"
            >
              <span className="bg-gradient-to-r from-[#559EFF] to-[#1065BA] bg-clip-text text-transparent">echo.</span>
            </motion.div>
            {/* Decorative elements */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -z-10 h-24 w-24 rounded-full bg-[#66ABFF]/10 blur-xl"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </motion.div>

          {/* Headline with stagger animation */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 max-w-4xl text-2xl font-bold leading-tight md:text-4xl md:leading-tight"
          >
            Turn Boring and Static Slides into
            <span className="bg-gradient-to-r from-[#559EFF] to-[#1065BA] bg-clip-text text-transparent">
              &nbsp; AI-Powered Voice Conversations
            </span>
          </motion.h1>

          {/* Subheadline with fade in */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12 max-w-3xl text-lg text-[#000D20]/80 md:text-xl"
          >
            Echo transforms both educational content and corporate training materials into AI-powered conversations, delivering 40% higher retention rates across classrooms and workplaces.
          </motion.p>


          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href="https://qa.10xr.co/public/agents?agentContextId=10xr-echo-intro-agent-v1&prospectName=Visitor&prospectEmail=info@10xr.co"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#559EFF] to-[#1065BA] p-[1px] transition-all hover:scale-105"
            >
              <span className="relative inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[#559EFF] to-[#1065BA] px-8 py-3 text-lg font-semibold text-white transition-all duration-300 ease-out group-hover:bg-opacity-90">
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center"
                >
                  Try Echo
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.span>
              </span>
            </Link>

            <Link
              href="/form"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#559EFF] to-[#1065BA] p-[1px] transition-all hover:scale-105"
            >
              <span className="relative inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[#559EFF] to-[#1065BA] px-8 py-3 text-lg font-semibold text-white transition-all duration-300 ease-out group-hover:bg-opacity-90">
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center"
                >
                  Request early access
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.span>
              </span>
            </Link>
          </motion.div>

          {/* Background decoration */}
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute -top-1/2 left-0 h-full w-full bg-gradient-radial from-[#66ABFF]/5 to-transparent"
            />
          </div>
        </div>
      </div>
    </main>
  )
}