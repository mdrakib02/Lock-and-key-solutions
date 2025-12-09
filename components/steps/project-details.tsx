"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "@/contexts/form-context"

export default function ProjectDetailsStep() {
  const { formData, setFormData } = useForm()
  const [details, setDetails] = useState(formData.projectDetails)
  const maxChars = 2000

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, maxChars)
    setDetails(value)
    setFormData({ projectDetails: value })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl lg:4xl font-bold text-gray-900 text-center mb-2">
          Tell me details about your needs
        </h2>
      </div>

      <div className="mt-8">
        <div className="relative">
          <textarea
          required
            placeholder=" Please provide as much detail as possible about your locksmith needs. This helps our professionals give you the most accurate quote. "
            value={details}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF5144] focus:ring-2 focus:ring-[#FF5144]/20 text-gray-900 placeholder-gray-400 transition-all resize-none"
          />

          <div className="flex justify-end mt-2">
            <span className="text-sm text-gray-500">
              {details.length}/{maxChars}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
