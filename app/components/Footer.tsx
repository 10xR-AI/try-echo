"use client"

import Link from "next/link"
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const socialIcons = [
    { icon: Instagram, href: "#instagram", label: "Follow us on Instagram" },
    { icon: Facebook, href: "#facebook", label: "Follow us on Facebook" },
    { icon: Twitter, href: "#twitter", label: "Follow us on Twitter" },
    { icon: Linkedin, href: "#linkedin", label: "Follow us on LinkedIn" },
    { icon: Youtube, href: "#youtube", label: "Subscribe to our YouTube channel" },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-white to-[#F8FBFF] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold bg-gradient-to-r from-[#559EFF] to-[#1065BA] bg-clip-text text-transparent"
          >
            echo.
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-16"
        >
          {/* Legal Links */}
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-2xl font-semibold text-rich-black mb-6">Legal</h3>
            <div className="space-y-4">
              {["Service Terms and Conditions", "Privacy Policy", "Cancellation and Refund Policy"].map(
                (text, index) => (
                  <Link
                    key={index}
                    href={`/${text.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group block text-lg text-rich-black/80 transition-colors hover:text-[#559EFF]"
                  >
                    <span className="inline-flex items-center">
                      <span className="relative">
                        {text}
                        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#559EFF] to-[#1065BA] transition-all duration-300 group-hover:w-full" />
                      </span>
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-2"
                      >
                        →
                      </motion.span>
                    </span>
                  </Link>
                ),
              )}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={item} className="space-y-6">
            <h3 className="text-2xl font-semibold text-rich-black">Stay Connected</h3>
            <motion.div variants={container} initial="hidden" animate="show" className="flex gap-4">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <motion.div key={href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={href}
                    className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#559EFF]/10 to-[#1065BA]/10 transition-all duration-300 hover:from-[#559EFF] hover:to-[#1065BA]"
                    aria-label={label}
                  >
                    <Icon className="h-6 w-6 text-rich-black transition-colors duration-300 group-hover:text-white" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-center text-sm text-rich-black/60">
            © {new Date().getFullYear()} Echo. All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 translate-y-1/2 bg-gradient-radial from-[#66ABFF]/5 to-transparent" />
      </div>
    </footer>
  )
}

