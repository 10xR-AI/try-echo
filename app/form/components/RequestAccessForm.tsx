"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons"



interface UnifiedFormData {
  // Common fields from both forms
  name: string;
  email: string;
  phoneNumber: string; // Combined mobile/phone
  countryCode: string;
  
  // Fields from RequestAccessForm
  useCase: string;
  timeline: string;
  audienceSize: string;
  
  // Fields from FeedbackDialog
  rating: number;
  feedback: string;
}



export default function RequestAccessForm() {
  const [formData, setFormData] = useState<UnifiedFormData>({
    name: '',
    email: '',
    countryCode: '',
    phoneNumber: '',
    useCase: '',
    timeline: '',
    audienceSize: '',
    rating: 0,
    feedback: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' })

  const useCases = [
    { value: 'corporate-training', label: 'Corporate Training & Development' },
    { value: 'higher-education', label: 'Higher Education' },
    { value: 'k12-education', label: 'K-12 Education' },
    { value: 'compliance-training', label: 'Compliance Training' },
    { value: 'professional-development', label: 'Professional Development' },
    { value: 'customer-education', label: 'Customer Education & Onboarding' }
  ]

  // New timeline options
  const timelineOptions = [
    { value: 'immediate', label: 'As soon as possible (within 1 week)' },
    { value: 'soon', label: 'Within 2-4 weeks' },
    { value: 'quarter', label: 'This quarter (within 3 months)' },
    { value: 'year', label: 'This year' },
    { value: 'exploring', label: 'Just exploring options' }
  ]

  const audienceSizes = [
    { value: '1-50', label: '1-50 learners' },
    { value: '51-200', label: '51-200 learners' },
    { value: '201-1000', label: '201-1,000 learners' },
    { value: '1001-5000', label: '1,001-5,000 learners' },
    { value: '5000+', label: '5,000+ learners' }
  ]

  const countryCodes = [
    { value: '+1', label: '+1 (US/Canada)' },
    { value: '+44', label: '+44 (UK)' },
    { value: '+91', label: '+91 (India)' },
    { value: '+61', label: '+61 (Australia)' },
    { value: '+86', label: '+86 (China)' },
    { value: '+49', label: '+49 (Germany)' },
    { value: '+33', label: '+33 (France)' },
    { value: '+81', label: '+81 (Japan)' },
  ]

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const fullPhoneNumber = formData.countryCode + formData.phoneNumber
      const formDataToSubmit = {
        ...formData,
        fullPhoneNumber,
        submittedAt: new Date().toISOString()
      }

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSubmit),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your submission! We\'ll be in touch soon.',
      })
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        countryCode: '',
        phoneNumber: '',
        useCase: '',
        timeline: '',
        audienceSize: '',
        rating: 0,
        feedback: ''
      })
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit form. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
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

          {/* Status Message */}
          {submitStatus.type && (
            <div
              className={`mb-6 p-4 rounded-md ${
                submitStatus.type === 'success'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}
            >
              {submitStatus.message}
            </div>
          )}

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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="flex gap-3">
                <select
                  id="countryCode"
                  name="countryCode"
                  required
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="w-1/3 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#559EFF] focus:border-transparent transition-colors bg-white"
                  disabled={isSubmitting}
                >
                  <option value="">Code</option>
                  {countryCodes.map(code => (
                    <option key={code.value} value={code.value}>
                      {code.label}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-2/3 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#559EFF] focus:border-transparent transition-colors"
                  placeholder="Enter your phone number"
                  disabled={isSubmitting}
                />
              </div>
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
                disabled={isSubmitting}
              >
                <option value="">Select your primary use case</option>
                {useCases.map(useCase => (
                  <option key={useCase.value} value={useCase.value}>
                    {useCase.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Timeline Dropdown - New Field */}
            <div>
              <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                How soon do you need this?
              </label>
              <select
                id="timeline"
                name="timeline"
                required
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#559EFF] focus:border-transparent transition-colors bg-white"
                disabled={isSubmitting}
              >
                <option value="">Select your timeline</option>
                {timelineOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
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
                disabled={isSubmitting}
              >
                <option value="">Select your audience size</option>
                {audienceSizes.map(size => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you rate your interest?
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    className="focus:outline-none"
                  >
                    {star <= formData.rating ? (
                      <StarFilledIcon className="w-8 h-8 text-yellow-400" />
                    ) : (
                      <StarIcon className="w-8 h-8 text-gray-300" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* New Feedback Field */}
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Comments
              </label>
              <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#559EFF] focus:border-transparent transition-colors"
                placeholder="Share any additional information or requirements..."
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={`w-full bg-gradient-to-r from-[#559EFF] to-[#1065BA] text-white font-semibold py-3 px-6 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-[#559EFF] focus:ring-offset-2 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </motion.button>
          </form>

          {/* Back Link */}
          <Link href="/">
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