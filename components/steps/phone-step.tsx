"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "@/contexts/form-context"

export default function PhoneStep() {
  const { formData, setFormData } = useForm()
  const [phone, setPhone] = useState(formData.phone)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhone(value)
    setFormData({ phone: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl lg:4xl font-bold text-gray-900 text-center mb-2">What is your phone number?  </h2>
      </div>

      <div className="mt-8">
        <input
          type="tel"
          required
          placeholder="(---) 555-1234"
          value={phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#FF5144] text-gray-900 placeholder-gray-500 transition-colors"
        />
      </div>
    </div>
  )
}
