"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CustomRadioGroup, CustomRadioGroupItem } from "@/components/ui/custom-radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Users, HelpCircle, Grid3X3, User, ChevronLeft, ChevronRight, Grip } from "lucide-react"
import { ArrowLeft } from "@untitledui/icons"
import CoachingFormAccordion from "./components/CoachingFormAccordion"


export default function Component() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  const isIntroToCollegeCoach = selectedCategory === "Intro to College Coach";

  const steps = [
    { number: 1, title: "Student and topic", description: "Description" },
    { number: 2, title: "Focus area", description: "Description" },
    { number: 3, title: "Date and time", description: "Description" }
  ];

  const getStepState = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) return "completed";
    if (currentStep === stepIndex) return "current";
    return "upcoming";
  };

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-500 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`} />
      
      {/* Modal */}
      <div className={`fixed inset-0 z-50 overflow-y-auto transition-transform duration-700 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-lg font-semibold text-gray-900">Schedule a Coaching Session</h1>
            </div>
            <Link href="/">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 bg-transparent">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-16">
            {/* Left Sidebar - Hidden on mobile, shows as progress bar instead */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                {/* Progress Steps Container */}
                <div className="w-full py-4 lg:py-6 bg-white/95 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200">
                  <div className="relative px-4">
                    {/* Continuous vertical connector line */}
                    <div className="absolute left-3 sm:left-4 w-0.5" style={{ 
                      top: '20px', 
                      height: `${(steps.length - 1) * 56}px` 
                    }}>
                      {/* Blue solid line for completed progress */}
                      <div 
                        className="absolute w-full bg-blue-800 transition-all duration-300 ease-out"
                        style={{
                          top: '0px',
                          height: `${Math.max(0, Math.min(completedSteps.length, steps.length - 1) * 56)}px`
                        }}
                      />
                      {/* Dotted line for remaining progress */}
                      <div 
                        className="absolute w-full"
                        style={{
                          top: `${Math.min(completedSteps.length, steps.length - 1) * 56}px`,
                          bottom: '0px',
                          backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
                          backgroundSize: '2px 8px',
                          backgroundRepeat: 'repeat-y'
                        }}
                      />
                    </div>
                    
                    <div className="space-y-6 lg:space-y-8">
                      {steps.map((step, index) => {
                        const state = getStepState(index);
                        
                        return (
                          <div key={index} className="relative flex items-start space-x-3 sm:space-x-4">
                            {/* Step Indicator - positioned to align with the vertical line */}
                            <div className={`relative z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
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
                            
                            {/* Step Content */}
                            <div className="flex-1 min-w-0 pt-1">
                              <h3 className={`text-sm font-medium ${
                                state === "completed" 
                                  ? "text-blue-800" 
                                  : state === "current"
                                  ? "text-blue-800"
                                  : "text-gray-500"
                              }`}>
                                {step.title}
                              </h3>
                              <p className="text-xs text-gray-400 mt-1">{step.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
              <div className="relative bg-white/95 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 p-4">
                {/* Horizontal connector line */}
                <div className="absolute top-4 left-6 right-6 h-0.5">
                  {/* Blue solid line for completed progress */}
                  <div 
                    className="absolute h-full bg-blue-800 transition-all duration-300 ease-out"
                    style={{
                      left: '0px',
                      width: `${Math.max(0, Math.min(completedSteps.length, steps.length - 1) / (steps.length - 1)) * 100}%`
                    }}
                  />
                  {/* Dotted line for remaining progress */}
                  <div 
                    className="absolute h-full"
                    style={{
                      left: `${Math.min(completedSteps.length, steps.length - 1) / (steps.length - 1) * 100}%`,
                      right: '0px',
                      backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
                      backgroundSize: '8px 2px',
                      backgroundRepeat: 'repeat-x'
                    }}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  {steps.map((step, index) => {
                    const state = getStepState(index);
                    
                    return (
                      <div key={index} className="relative flex flex-col items-center">
                        {/* Step Indicator */}
                        <div className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
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
                            <span className="text-sm font-medium">{step.number}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
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
