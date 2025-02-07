"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function RequestAccessForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    useCase: '',
    audienceSize: ''
  })

  const useCases = [
    { value: 'corporate-training', label: 'Corporate Training & Development' },
    { value: 'higher-education', label: 'Higher Education' },
    { value: 'k12-education', label: 'K-12 Education' },
    { value: 'compliance-training', label: 'Compliance Training' },
    { value: 'professional-development', label: 'Professional Development' },
    { value: 'customer-education', label: 'Customer Education & Onboarding' }
  ]

  const audienceSizes = [
    { value: '1-50', label: '1-50 learners' },
    { value: '51-200', label: '51-200 learners' },
    { value: '201-1000', label: '201-1,000 learners' },
    { value: '1001-5000', label: '1,001-5,000 learners' },
    { value: '5000+', label: '5,000+ learners' }
  ]

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Handle form submission - integrate with your backend
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#F8FBFF] text-[#000D20]">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Request Early Access to
              <span className="bg-gradient-to-r from-[#559EFF] to-[#1065BA] bg-clip-text text-transparent">
                {" "}echo.
              </span>
            </h1>
            <p className="text-[#000D20]/80 text-lg">
              Join our early access program and transform your learning experience
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#559EFF] focus:border-transparent transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Work Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#559EFF] focus:border-transparent transition-colors"
                placeholder="Enter your work email"
              />
            </div>

            {/* Use Case Dropdown */}
            <div>
              <label htmlFor="useCase" className="block text-sm font-medium text-gray-700 mb-2">
                Primary Use Case
              </label>
              <select
                id="useCase"
                name="useCase"
                required
                value={formData.useCase}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#559EFF] focus:border-transparent transition-colors bg-white"
              >
                <option value="">Select your primary use case</option>
                {useCases.map(useCase => (
                  <option key={useCase.value} value={useCase.value}>
                    {useCase.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Audience Size Dropdown */}
            <div>
              <label htmlFor="audienceSize" className="block text-sm font-medium text-gray-700 mb-2">
                Expected Audience Size
              </label>
              <select
                id="audienceSize"
                name="audienceSize"
                required
                value={formData.audienceSize}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#559EFF] focus:border-transparent transition-colors bg-white"
              >
                <option value="">Select your audience size</option>
                {audienceSizes.map(size => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#559EFF] to-[#1065BA] text-white font-semibold py-3 px-6 rounded-md hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#559EFF] focus:ring-offset-2"
            >
              Submit Request
            </motion.button>
          </form>
<Link href="/">
          {/* Back Link */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6"
          >
            
              ← Back to home

          </motion.div>
          </Link>
        </motion.div>
      </div>
    </main>
  )
}