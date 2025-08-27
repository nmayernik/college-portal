"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, ArrowLeft, ExternalLink, CheckCircle, Info } from "lucide-react"

interface TutoringFormModalProps {
  onClose: () => void
  onCreditsPurchased?: (credits: number, provider: string) => void
}

interface TutoringProvider {
  id: string
  name: string
  description: string
  features: string[]
  ageRange: string
  logo: string
  isBrightChoice?: boolean
}

interface TutoringPackage {
  id: string
  hours: number
  daysDeducted: number
  description: string
}

const tutoringProviders: TutoringProvider[] = [
  {
    id: "sylvan-in-person",
    name: "Sylvan Learning In-Person Tutoring",
    description: "Experience the Proven Sylvan Method™ in person at our learning centers.",
    features: [
      "Proven, personal and ongoing tutoring programs customized to achieve academic goals.",
      "Sylvan students experience up to 3X more growth than their peers.",
      "Dedicated learning environment with expert tutors and motivation program make learning engaging and fun!",
      "Individualized instruction in a 3:1 learning environment."
    ],
    ageRange: "Ages: 5 yrs - 18 yrs",
    logo: "Sylvan Learning.sm",
    isBrightChoice: true
  },
  {
    id: "sylvan-virtual",
    name: "Sylvan Learning Virtual Tutoring",
    description: "Experience the Proven Sylvan Method™ Trust the brand with 40+ years of delivering results for millions of K-12 families.",
    features: [
      "Expert tutoring support tailored to your child's exact needs.",
      "Expert, Sylvan-certified teachers use our proven curriculum to ensure academic growth.",
      "Sylvan students can experience up to 3X more results."
    ],
    ageRange: "Ages: 5 yrs - 18 yrs",
    logo: "Sylvan Learning.sm",
    isBrightChoice: true
  },
  {
    id: "revolution-prep",
    name: "Revolution Prep Virtual Tutoring",
    description: "Private Tutoring for Grades K-College Over 1 million students have chosen our online platform to maximize their potential.",
    features: [
      "Work on what you want, when you want.",
      "Expert tutors available 24/7 for flexible scheduling.",
      "Personalized learning plans tailored to your child's needs.",
      "Live interactive sessions with real-time feedback."
    ],
    ageRange: "Grades K-College",
    logo: "Revolution Prep",
    isBrightChoice: true
  }
]

const tutoringPackages: TutoringPackage[] = [
  {
    id: "4-hours",
    hours: 4,
    daysDeducted: 1,
    description: "Perfect for getting started with tutoring"
  },
  {
    id: "8-hours",
    hours: 8,
    daysDeducted: 2,
    description: "Most popular choice for ongoing support"
  },
  {
    id: "12-hours",
    hours: 12,
    daysDeducted: 3,
    description: "Comprehensive tutoring package"
  }
]

export default function TutoringFormModal({ onClose }: TutoringFormModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [selectedProvider, setSelectedProvider] = useState("")
  const [selectedPackage, setSelectedPackage] = useState("")
  const [isBookingCompleted, setIsBookingCompleted] = useState(false)

  const steps = [
    { number: 1, title: "Provider" },
    { number: 2, title: "Package" },
    { number: 3, title: "Checkout" },
    { number: 4, title: "Success" }
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

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => [...prev, currentStep])
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setCompletedSteps(prev => prev.filter(step => step !== currentStep - 1))
    }
  }

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId)
  }

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId)
  }

  const handleCompleteBooking = () => {
    const selectedProviderData = tutoringProviders.find(p => p.id === selectedProvider)
    const selectedPackageData = tutoringPackages.find(p => p.id === selectedPackage)
    
    setIsBookingCompleted(true)
    setCompletedSteps(prev => [...prev, currentStep])
    setCurrentStep(currentStep + 1)
    
    // Call the callback to update the home page
    if (onCreditsPurchased && selectedPackageData && selectedProviderData) {
      onCreditsPurchased(selectedPackageData.hours, selectedProviderData.name)
    }
  }

  const renderStepContent = () => {
    const selectedProviderData = tutoringProviders.find(p => p.id === selectedProvider)
    const selectedPackageData = tutoringPackages.find(p => p.id === selectedPackage)
    
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="mb-8">
                              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Choose your provider</h2>
              <p className="text-base text-gray-700">
                Providers below are filtered by your selected student's age and your employer's offerings.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {tutoringProviders.map((provider) => (
                <label 
                  key={provider.id}
                  className={`p-4 lg:p-6 rounded-xl border cursor-pointer transition-colors duration-200 ease-out flex items-start gap-4 touch-manipulation bg-white ${
                    selectedProvider === provider.id 
                      ? "ring-blue-700 ring-2 border-white hover:bg-blue-25 active:bg-blue-100" 
                      : "border-gray-400 hover:bg-gray-50 active:bg-gray-100"
                  }`}
                  style={{ minHeight: '44px' }}
                >
                  <input
                    type="radio"
                    name="provider"
                    value={provider.id}
                    checked={selectedProvider === provider.id}
                    onChange={() => handleProviderSelect(provider.id)}
                    className="sr-only"
                    aria-label={`Select provider: ${provider.name}`}
                  />
                  
                  {/* Left side with logo */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center">
                      {provider.id.includes('sylvan') ? (
                        <img 
                          src="/Sylvan logo.svg" 
                          alt="Sylvan Learning" 
                          className="w-full h-full object-contain rounded-xl border border-gray-200"
                        />
                      ) : provider.id.includes('revolution') ? (
                        <img 
                          src="/Revprep logo.svg" 
                          alt="Revolution Prep" 
                          className="w-full h-full object-contain rounded-xl border border-gray-200"
                        />
                      ) : (
                        <span className="text-xs text-gray-500 font-medium text-center">{provider.logo}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Right side with content */}
                  <div className="flex-1 space-y-4">
                    {/* Header with title */}
                    <div className="space-y-2">
                      <div className="font-medium text-lg text-gray-800">{provider.name}</div>
                      <div className="text-sm text-gray-700">{provider.description}</div>
                    </div>
                    
                    {/* Features list */}
                    <ul className="space-y-2">
                      {provider.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    {/* Footer with age range and more info */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-gray-500">{provider.ageRange}</span>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        More Info
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )
      
      case 1:
        return (
          <div className="space-y-6">
                          <div className="text-left mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Choose how many tutoring credits to use</h2>
                <p className="text-base text-gray-700">
                  Selected hours must be used within 30 days
                </p>

            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {tutoringPackages.map((pkg) => (
                <label 
                  key={pkg.id}
                  className={`p-4 lg:p-6 rounded-xl border cursor-pointer transition-colors duration-200 ease-out flex items-center gap-4 touch-manipulation bg-white ${
                    selectedPackage === pkg.id 
                      ? "ring-blue-700 ring-2 border-white hover:bg-blue-25 active:bg-blue-100" 
                      : "border-gray-400 hover:bg-gray-50 active:bg-gray-100"
                  }`}
                  style={{ minHeight: '44px' }}
                >
                  <input
                    type="radio"
                    name="package"
                    value={pkg.id}
                    checked={selectedPackage === pkg.id}
                    onChange={() => handlePackageSelect(pkg.id)}
                    className="sr-only"
                    aria-label={`Select package: ${pkg.hours} Virtual Tutoring Hours`}
                  />
                  
                  <div className="flex-1">
                    <div className="font-medium text-lg text-gray-800">
                      {pkg.hours} Virtual Tutoring Hours
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Deducts {pkg.daysDeducted} {pkg.daysDeducted === 1 ? 'day' : 'days'} from your bank
                    </div>
                  </div>
                  
                  {pkg.id === "8-hours" && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                      Most Popular
                    </Badge>
                  )}
                </label>
              ))}
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Checkout</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">

                {/* Payment Method */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Payment Method *</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Primary Account</p>
                          <p className="text-sm text-gray-600">****1234</p>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        + Add new payment method
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Preferred Contact Method */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Preferred Contact Method *</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup defaultValue="email" className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="email" />
                        <Label htmlFor="email" className="flex-1">
                          <div>
                            <p className="font-medium">Email *</p>
                            <input 
                              type="email" 
                              placeholder="Enter your email"
                              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="phone" />
                        <Label htmlFor="phone" className="flex-1">
                          <div>
                            <p className="font-medium">Phone *</p>
                            <input 
                              type="tel" 
                              placeholder="xxx-xxx-xxxx"
                              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Enter valid 10-digit USA phone number. Example xxx-xxx-xxxx.
                            </p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                    <p className="text-sm text-gray-600 mt-3">
                      We'll use your preferred contact method for information/updates regarding this reservation.
                    </p>
                  </CardContent>
                </Card>


              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Use By</span>
                      <span>30 Dec 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tutoring Hours</span>
                      <span>{selectedPackageData?.hours} virtual hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Student</span>
                      <span>Grace Smith</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Provider</span>
                      <span className="text-right">{selectedProviderData?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Days Deducted</span>
                      <span>{selectedPackageData?.daysDeducted} days</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-semibold">
                        <span>Estimated Co-Pay</span>
                        <span>$30</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-3">
                      Estimates are based on current reservation details. Charges are subject to change with changes to the reservation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Booking Confirmed!</h2>
              <p className="text-base text-gray-700 max-w-md mx-auto">
                Your tutoring credits have been successfully reserved. You'll receive a confirmation email shortly.
              </p>
            </div>
            
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Provider</span>
                  <span className="font-medium">{selectedProviderData?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tutoring Hours</span>
                  <span className="font-medium">{selectedPackageData?.hours} virtual hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Days Deducted</span>
                  <span className="font-medium">{selectedPackageData?.daysDeducted} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Student</span>
                  <span className="font-medium">Grace Smith</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total Co-Pay</span>
                    <span>$30</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Your tutoring provider will contact you within 24 hours to schedule your sessions.
              </p>
              <Button onClick={handleClose} className="bg-blue-800 text-white hover:bg-blue-700">
                Return to Dashboard
              </Button>
            </div>
          </div>
        )
      
      default:
        return null
    }
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
          <div className="flex items-center px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              {currentStep > 0 && (
                <button onClick={handleBack} className="text-blue-600 hover:text-blue-700 mr-4">
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
            </div>
            <h1 className="text-lg font-semibold text-gray-900 text-center flex-1">Book Tutoring</h1>
            <button onClick={handleClose}>
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
                    height: `${(steps.length - 2) * 64}px`
                  }}>
                    {/* Blue solid line for completed progress */}
                    <div 
                      className="absolute w-full bg-blue-800 transition-all duration-300 ease-out"
                      style={{
                        top: '0px',
                        height: `${Math.max(0, Math.min(completedSteps.length, steps.length - 2) * 64)}px`
                      }}
                    />
                    {/* Dotted line for remaining progress */}
                    <div 
                      className="absolute w-full"
                      style={{
                        top: `${Math.min(completedSteps.length, steps.length - 2) * 64}px`,
                        bottom: '0px',
                        backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
                        backgroundSize: '2px 8px',
                        backgroundRepeat: 'repeat-y'
                      }}
                    />
                  </div>
                  
                  <div className="space-y-8">
                    {steps.slice(0, -1).map((step, index) => {
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
                <h1 className="text-xl sm:text-2xl font-semibold text-blue-800">Book Tutoring</h1>
                <p className="text-sm text-gray-700">Convert your backup care credits for tutoring services.</p>
              </div>
              {/* Mobile Horizontal Stepper */}
              <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  {steps.slice(0, -1).map((step, index) => {
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

            {/* Main Form Content */}
            <div className="lg:col-span-3">
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              {currentStep < 3 && (
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <div>
                    {currentStep > 0 && (
                      <Button variant="outline" onClick={handleBack}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                    )}
                  </div>
                  <div>
                    {currentStep < 2 ? (
                      <Button 
                        onClick={handleNext}
                        disabled={
                          (currentStep === 0 && !selectedProvider) ||
                          (currentStep === 1 && !selectedPackage)
                        }
                      >
                        Continue
                        <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleCompleteBooking}
                        className="bg-yellow-500 text-blue-800 hover:bg-yellow-400"
                      >
                        Reserve Credits
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
