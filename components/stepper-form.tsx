"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "@/contexts/form-context"
import EmailStep from "./steps/email-step"
import NameStep from "./steps/name-step"
import PhoneStep from "./steps/phone-step"
import ZipCodeStep from "./steps/zip-code-step"
import TimingStep from "./steps/timing-step"
import ProjectDetailsStep from "./steps/project-details"
import ProgressBar from "./progress-bar"
import SubmitModal from "./submit-modal"

const steps = [
    { id: 0, title: "Email" },
    { id: 1, title: "Name" },
    { id: 2, title: "Phone" },
    { id: 3, title: "Zip Code" },
    { id: 4, title: "Timing" },
    { id: 5, title: "Project Details" },
]

export default function StepperForm() {
    const { currentStep, goNext, goPrev, formData } = useForm()
    const [showModal, setShowModal] = useState(false)

    const isCurrentStepValid = () => {
        switch (currentStep) {
            case 0:
                return formData.zipCode.trim() !== ""

            case 1:
                return formData.timing !== ""
            case 2:
                return formData.name.trim() !== ""
            case 3:
                return formData.phone.trim() !== ""
            case 4:
                return formData.email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
            case 5:
                return true // Project details is optional
            default:
                return false
        }
    }

    const handleNext = async () => {
        if (currentStep === 5) {
            setShowModal(true)
            // Send a mail with sesend

            const res = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            // if (data.success) {
            //     alert("Message sent!");
            // } else {
            //     alert("Error sending message.");
            // }

        } else {
            goNext()
        }
    }

    const stepComponents = [
        <ZipCodeStep key="zip" />,
        <TimingStep key="timing" />,
        <NameStep key="name" />,
        <PhoneStep key="phone" />,
        <EmailStep key="email" />,
        <ProjectDetailsStep key="details" />,
    ]

    return (
        <div className="min-h-screen bg-white">
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} />

            <div className="border-b border-gray-200 bg-white pt-8">
                <div className="max-w-2xl mx-auto px-6 py-6">
                    <h1 className="text-2xl md:text-4xl font-bold text-[#FF5144] text-center">Rawkeys Locksmith</h1>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 py-16">
                {/* Step content */}
                <div className="min-h-80">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                        >
                            {stepComponents[currentStep]}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex gap-4 mt-16 pt-8 border-t border-gray-200">
                    <button
                        onClick={goPrev}
                        disabled={currentStep === 0}
                        className={currentStep === 0 ? "hidden flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors" : "flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors block"}
                    >
                        Back

                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!isCurrentStepValid()}
                        className="flex-1 px-6 py-3 bg-[#FF5144] text-white font-bold rounded-sm hover:bg-[#E63E2F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {currentStep === 5 ? "Submit" : "Next"}
                    </button>
                </div>
            </div>

            {/* Submit modal */}
            <SubmitModal isOpen={showModal} onClose={() => setShowModal(false)} />
            <footer className=" border-t border-gray-300 mt-8">
                <div className="max-w-6xl mx-auto px-6 py-6 flex justify-center items-center my-auto">
                    <p className="text-gray-500 text-sm text-center">
                        © 1995-2025, Lock & Key Solutions. All Rights Reserved.
                    </p>
                </div>
            </footer>


        </div>

    )
}
