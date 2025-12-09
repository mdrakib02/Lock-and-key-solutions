"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "../../contexts/form-context"
import { CircleCheckBig, LocateFixed, MapPinned, SearchCheck } from 'lucide-react';


export default function ZipCodeStep() {
    const { formData, setFormData } = useForm()
    const [zipCode, setZipCode] = useState(formData.zipCode)
    const [location, setLocation] = useState(formData.location)
    const [loading, setLoading] = useState(false)


    const fetchLocationFromZip = async (zip: string) => {
        if (zip.length === 5 && /^\d{5}$/.test(zip)) {
            setLoading(true)
            try {
                const response = await fetch(`https://api.zippopotam.us/us/${zip}`)
                if (response.ok) {
                    const data = await response.json()
                    const city = data.places[0]?.["place name"] || ""
                    const state = data.places[0]?.["state abbreviation"] || ""
                    const locationStr = `${city}, ${state}`
                    setLocation(locationStr)
                    
                    setFormData({ location: locationStr })
                } else {
                    setLocation("Location not found")
                }
            } catch (error) {
                console.error("Error fetching location:", error)
                setLocation("Error fetching location")
            } finally {
                setLoading(false)
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setZipCode(value)
        setFormData({ zipCode: value })

        // Fetch location when zip is complete
        if (value.length === 5) {
            fetchLocationFromZip(value)
        }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value.length === 5 && !location) {
            fetchLocationFromZip(value)
        }
    }

    return (
        <div className="space-y-8">
            <div 
            style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.5" }}
            >
                <h2 className="text-2xl md:text-3xl lg:4xl font-bold text-gray-900 text-center mb-2">What is your zip code?</h2>
            </div>

            <div className="mt-8 flex items-center gap-x-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Enter your zip code"
                        value={zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={5}
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg
                 focus:outline-none focus:border-[#FF5144] focus:ring-2
                 focus:ring-[#FF5144]/20 text-gray-900 placeholder-gray-400 transition-all"
                    />

                    <CircleCheckBig
                        size={24}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 text-lime-500 ${zipCode.length > 4 ? 'block' : 'hidden'
                            }`}
                    />

                </div>

                <div className="px-4 py-3 border border-gray-300 rounded-lg">
                    <LocateFixed />
                </div>
            </div>

            {zipCode.length > 4 && (
                <div className="p-3 ">
                    <p className="text-md text-lime-500 font-semibold">
                        {loading ? (
                            "Fetching location..."
                        ) : (
                            <>
                                <MapPinned size={20} className="inline-block mr-1" />
                                {location}
                            </>
                        )}
                    </p>

                </div>
            )}

        </div>
    )
}
