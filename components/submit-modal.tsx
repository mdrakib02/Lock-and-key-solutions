"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "@/contexts/form-context"

interface SubmitModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SubmitModal({ isOpen, onClose }: SubmitModalProps) {
  const { formData, setCurrentStep, setFormData } = useForm()
  const [isLoading, setIsLoading] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      setShowSuccess(false)
      setLoadingProgress(0)

      // Simulate progress over 2 seconds
      const startTime = Date.now()
      const duration = 2000
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progress = Math.min((elapsed / duration) * 100, 100)
        setLoadingProgress(progress)

        if (progress >= 100) {
          clearInterval(progressInterval)
          setIsLoading(false)
          setShowSuccess(true)
        }
      }, 50)

      return () => clearInterval(progressInterval)
    }
  }, [isOpen])

  const handleClose = () => {

    setFormData({
      email: "",
      name: "",
      phone: "",
      zipCode: "",
      location: "",
      timing: "",
      projectDetails: "",
    })
    setCurrentStep(0)
    onClose()
    setShowSuccess(false)
  }

  const getTimingLabel = (timing: string) => {
    const map: { [key: string]: string } = {
      within2weeks: "Within 2 weeks",
      moreThan2weeks: "More than 2 weeks",
      notSure: "Not sure - still planning/budgeting",
    }
    return map[timing] || timing
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden max-h-[90vh] overflow-y-auto">
              {isLoading ? (
                <div>
                  <div className="w-full h-1 bg-gray-200">
                    <motion.div
                      className="bg-[#FF5144] h-full"
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center py-12 px-8 space-y-6">
                    <div className="relative w-16 h-16">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="absolute inset-0 border-4 border-transparent border-t-[#FF5144] rounded-full"
                      />
                    </div>
                    <p className="text-gray-600 font-medium">Processing...</p>
                  </div>
                </div>
              ) : showSuccess ? (
                <div className="p-8 space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="flex items-center justify-center w-16 h-16 bg-[#FF5144] rounded-full mx-auto"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Success!</h3>
                    <p className="text-gray-600 text-sm">Thank you for providing your information.</p>
                  </div>

                  <div className="w-full bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-900">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium text-gray-900">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium text-gray-900">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Zip Code:</span>
                      <span className="font-medium text-gray-900">{formData.zipCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium text-gray-900">{formData.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Timeline:</span>
                      <span className="font-medium text-gray-900">{getTimingLabel(formData.timing)}</span>
                    </div>
                    {formData.projectDetails && (
                      <div className="pt-3 border-t border-gray-200">
                        <span className="text-gray-600">Project Details:</span>
                        <p className="text-gray-900 mt-1 text-xs leading-relaxed">{formData.projectDetails}</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full px-6 py-3 bg-[#FF5144] text-white font-semibold rounded-lg hover:bg-[#E63E2F] transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : null}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
