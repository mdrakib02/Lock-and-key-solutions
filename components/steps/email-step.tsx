"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "@/contexts/form-context"

export default function EmailStep() {
  const { formData, setFormData } = useForm()
  const [email, setEmail] = useState(formData.email)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setFormData({ email: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl lg:4xl font-bold text-gray-900 text-center mb-2">What is your email?</h2>
      </div>

      <div className="mt-8">
        <input
          type="email"
          required
          placeholder="john.doe@example.com"
          value={email}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#FF5144] text-gray-900 placeholder-gray-500 transition-colors"
        />
        
      </div>
    </div>
  )
}
