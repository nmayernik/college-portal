"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X, ArrowLeft } from "lucide-react"
import CoachingFormAccordion from "./CoachingFormAccordion"

interface CoachingFormModalProps {
  onClose: () => void
}

export default function CoachingFormModal({ onClose }: CoachingFormModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")

  const steps = [
    { number: 1, title: "Provider" },
    { number: 2, title: "Package" },
    { number: 3, title: "Checkout" }
  ]

  const getStepState = (index: number) => {
    if (completedSteps.includes(index)) return "completed"
    if (index === currentStep) return "current"
    return "upcoming"
  }

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      onClose()
    }, 500)
  }

  return (
    <>
      {/* Backdrop */}
      <div className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 ease-out-quart ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`} onClick={handleClose} />
      
      {/* Modal */}
      <div className={`fixed inset-0 z-50 overflow-y-auto transition-transform duration-500 ease-out-quint bg-gradient-to-b from-blue-50 to-white ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-lg font-semibold text-gray-900">Schedule a Coaching Session</h1>
            <button onClick={handleClose} className="absolute right-4 sm:right-6 lg:right-8">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 bg-transparent">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-16">
            {/* Left Sidebar - Hidden on mobile, shows as progress bar instead */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <div className="relative px-4">
                  {/* Continuous vertical connector line */}
                  <div className="absolute left-7 w-0.5" style={{ 
                    top: '16px', 
                    height: `${(steps.length - 1) * 64}px`
                  }}>
                    {/* Blue solid line for completed progress */}
                    <div 
                      className="absolute w-full bg-blue-800 transition-all duration-300 ease-out"
                      style={{
                        top: '0px',
                        height: `${Math.max(0, Math.min(completedSteps.length, steps.length - 1) * 64)}px`
                      }}
                    />
                    {/* Dotted line for remaining progress */}
                    <div 
                      className="absolute w-full"
                      style={{
                        top: `${Math.min(completedSteps.length, steps.length - 1) * 64}px`,
                        bottom: '0px',
                        backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
                        backgroundSize: '2px 8px',
                        backgroundRepeat: 'repeat-y'
                      }}
                    />
                  </div>
                  
                  <div className="space-y-8">
                    {steps.map((step, index) => {
                      const state = getStepState(index);
                      
                      return (
                        <div key={index} className="relative flex items-start space-x-4">
                          {/* Step Indicator - positioned to align with the vertical line */}
                                                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              state === "completed" 
                                ? "bg-blue-800 text-white" 
                                : state === "current"
                                ? "bg-blue-800 text-white"
                                : "bg-gray-100 text-gray-700"
                            }`}>
                            {state === "completed" ? (
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <span className="text-sm font-semibold">{step.number}</span>
                            )}
                          </div>
                          
                                                      {/* Step Content */}
                            <div className="flex-1 min-w-0 pt-0.5">
                              <h3 className={`text-base font-semibold ${
                                state === "completed" 
                                  ? "text-blue-800" 
                                  : state === "current"
                                  ? "text-blue-800"
                                  : "text-gray-800"
                              }`}>
                                {step.title}
                              </h3>

                            </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Header and Stepper */}
            <div className="lg:hidden mb-4 sm:mb-6">
              {/* Mobile Header */}
              <div className="mb-4 space-y-1">
                <h1 className="text-xl sm:text-2xl font-semibold text-blue-800">Schedule a Coaching Session</h1>
                <p className="text-sm text-gray-700">Book a call with one of our experts to discuss your needs.</p>
              </div>
              {/* Mobile Horizontal Stepper */}
              <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => {
                    const state = getStepState(index);
                    const isLast = index === steps.length - 1;
                    
                    return (
                      <div key={index} className="flex items-center">
                        <div className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                          state === "completed" 
                            ? "bg-blue-800 border-blue-800 text-white" 
                            : state === "current"
                            ? "bg-white border-blue-800 text-blue-800"
                            : "bg-white border-gray-300 text-gray-400"
                        }`}>
                          {state === "completed" ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span className="text-xs font-medium">{step.number}</span>
                          )}
                        </div>
                        {!isLast && (
                          <div className={`w-12 h-0.5 mx-2 ${
                            state === "completed" ? "bg-blue-800" : "bg-gray-300"
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 text-center">
                  <span className="text-sm font-medium text-blue-800">
                    {steps[currentStep]?.title}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Form - Now using Accordion */}
            <div className="lg:col-span-3">
              <CoachingFormAccordion
                onStepChange={setCurrentStep}
                onCompletedStepsChange={setCompletedSteps}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
