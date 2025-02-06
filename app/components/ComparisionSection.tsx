'use client'

import { motion } from "framer-motion"
import { BookOpen, MessageSquare, Users, GitBranch, ClipboardList, Bot, MessageCircle, Network, LineChart, RefreshCw } from 'lucide-react'

export default function ComparisonSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  

  const ComparisonItem = ({ text, icon: Icon, isEcho = false }) => (
    <motion.li 
      variants={item}
      className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-300
        ${isEcho ? 'hover:bg-[#66ABFF]/10' : 'hover:bg-gray-200'}`}
    >
      <Icon className={`h-6 w-6 mt-1 flex-shrink-0 
        ${isEcho ? 'text-[#559EFF]' : 'text-gray-500'}`}
      />
      <span className="text-lg text-rich-black">{text}</span>
    </motion.li>
  )

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F8FBFF]">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-rich-black text-center mb-12 md:mb-16"
        >
          Traditional Learning vs{' '}
          <span className="bg-gradient-to-r from-[#559EFF] to-[#1065BA] bg-clip-text text-transparent">
            Echo Experience
          </span>
        </motion.h2>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Traditional Way */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 md:p-12 shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent opacity-50" />
            <h3 className="relative text-2xl font-bold text-rich-black mb-8 text-center">
              Traditional Way
            </h3>
            <motion.ul 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative space-y-4"
            >
              <ComparisonItem text="One-way lectures with limited interaction" icon={BookOpen} />
              <ComparisonItem text="Students hesitate to ask questions" icon={MessageSquare} />
              <ComparisonItem text="Fixed content delivery" icon={GitBranch} />
              <ComparisonItem text="Manual assessment process" icon={ClipboardList} />
              <ComparisonItem text="Limited feedback loops" icon={Users} />
            </motion.ul>
          </motion.div>

          {/* Echo Way */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-[#559EFF]/20 bg-white p-8 md:p-12 shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#66ABFF]/5 to-transparent" />
            <h3 className="relative text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[#559EFF] to-[#1065BA] bg-clip-text text-transparent">
              Echo Way
            </h3>
            <motion.ul 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative space-y-4"
            >
              <ComparisonItem text="Interactive AI-powered conversations" icon={Bot} isEcho />
              <ComparisonItem text="Natural voice-based Q&A anytime" icon={MessageCircle} isEcho />
              <ComparisonItem text="Adaptive learning paths" icon={Network} isEcho />
              <ComparisonItem text="Automated real-time assessment" icon={LineChart} isEcho />
              <ComparisonItem text="Continuous improvement feedback" icon={RefreshCw} isEcho />
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
