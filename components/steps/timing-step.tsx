"use client"

import { useState } from "react"
import { useForm } from "@/contexts/form-context"

export default function TimingStep() {
  const { formData, setFormData } = useForm()
  const [timing, setTiming] = useState(formData.timing)

  const options = [
    { value: "Residential Locksmith", label: "Residential Locksmith" },
    { value: "Commercial Locksmith", label: "Commercial Locksmith" },
    { value: "24 Hours Locksmith", label: "24 Hours Locksmith" },
    { value: "Others", label: "Others" },
  ]

  const handleChange = (value: string) => {
    setTiming(value)
    setFormData({ timing: value })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl lg:4xl font-bold text-gray-900 text-center mb-2">What Services Do You Need?</h2>
      </div>

      <div className=" mt-8">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center p-4 border-[1px] border-gray-200 cursor-pointer transition-all hover:border-[#FF5144]"
            style={{
              borderColor: timing === option.value ? "#FF5144" : "#E5E7EB",
              backgroundColor: timing === option.value ? "#FFF5F3" : "white",
            }}
          >
            <input
              type="radio"
              name="timing"
              value={option.value}
              checked={timing === option.value}
              onChange={() => handleChange(option.value)}
              className="w-4 h-4 text-[#FF5144] cursor-pointer"
            />
            <span className="ml-3 text-gray-900 font-medium">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
