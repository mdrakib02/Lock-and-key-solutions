"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="w-full">
      <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className="bg-[#FF5144] h-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  )
}
