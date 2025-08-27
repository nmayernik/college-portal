"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/components/ui/logo"
import AccountButton from "@/components/ui/account-button"
import { 
  Calendar, 
  GraduationHat01,
  AlarmClock,
  Star01,
  ArrowRight,
  BookOpen01,
  Target01,
  Users01
} from "@untitledui/icons"
import Link from "next/link"
import CoachingFormModal from "@/components/CoachingFormModal"
import TutoringFormModal from "@/components/TutoringFormModal"
import MessageModal from "@/components/MessageModal"
import BentoEnrollmentCard from "@/components/BentoEnrollmentCard"
import BentoNetworkCard from "@/components/BentoNetworkCard"
import BentoTutoringCard from "@/components/BentoTutoringCard"

export default function LandingPage() {
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'coaching' | 'tutoring' | null>(null)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false)
  const [purchasedCredits, setPurchasedCredits] = useState<number | undefined>(undefined)
  const [purchasedProvider, setPurchasedProvider] = useState<string | undefined>(undefined)

  // Handle URL changes to show/hide modal
  useEffect(() => {
    const handleRouteChange = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const modalParam = urlParams.get('modal')
      
      if (window.location.pathname === '/schedule' || modalParam === 'coaching') {
        setShowModal(true)
        setModalType('coaching')
      } else if (modalParam === 'tutoring') {
        setShowModal(true)
        setModalType('tutoring')
      } else {
        setShowModal(false)
        setModalType(null)
      }
    }

    // Check initial route
    handleRouteChange()

    // Listen for popstate events (back/forward buttons)
    window.addEventListener('popstate', handleRouteChange)
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  const handleScheduleClick = () => {
    setShowModal(true)
    setModalType('coaching')
    // Update URL without navigation
    window.history.pushState({}, '', '/schedule')
  }

  const handleTutoringClick = () => {
    setShowModal(true)
    setModalType('tutoring')
    // Update URL without navigation
    window.history.pushState({}, '', '/?modal=tutoring')
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setModalType(null)
    // Update URL back to home
    window.history.pushState({}, '', '/')
  }

  const handleMessageClick = () => {
    setShowMessageModal(true)
  }

  const handleCreditsPurchased = (credits: number, provider: string) => {
    setPurchasedCredits(credits)
    setPurchasedProvider(provider)
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Logo variant="vector" className="h-8 text-blue-600" />
            </div>
            <div className="hidden md:flex items-center space-x-6 text-base font-semibold">
              <a href="/" className="text-blue-800 hover:text-blue-700 transition-colors px-3 py-2 rounded-lg bg-blue-50">Home</a>
              <a href="/benefits" className="text-blue-800 hover:text-blue-700 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">Benefits</a>
              <a href="/resources" className="text-blue-800 hover:text-blue-700 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">Resources</a>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowAppointmentsModal(true)}
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full"
              >
                <Calendar className="w-5 h-5" />
              </Button>
              <AccountButton className="w-[129px] h-[40px] cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

            {/* Bento Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <BentoEnrollmentCard onScheduleClick={handleScheduleClick} />
          </div>
          <div className="lg:col-span-1">
            <BentoNetworkCard 
              onMessageClick={handleMessageClick} 
              onScheduleClick={handleScheduleClick} 
            />
          </div>
        </div>
        
        {/* Tutoring Bento Card */}
        <div className="grid lg:grid-cols-1 gap-8">
                          <BentoTutoringCard 
                  onTutoringClick={handleTutoringClick}
                  purchasedCredits={purchasedCredits}
                  purchasedProvider={purchasedProvider}
                />
        </div>
      </section>

      {/* Features Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-blue-800 mb-4">Our Services</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Comprehensive support for your college planning journey, from expert guidance to financial planning.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white rounded-[24px] border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Target01 className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-blue-800">Expert guidance</CardTitle>
              <CardDescription className="text-gray-700">
                Get 1:1 guidance from admissions and college finance experts on courses, extracurriculars, and the college process. We're here to help!
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white rounded-[24px] border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Star01 className="h-6 w-6 text-yellow-600" />
              </div>
              <CardTitle className="text-xl text-blue-800">Learning Center</CardTitle>
              <CardDescription className="text-gray-700">
                Access videos, resources, and frequently asked questions online at any time.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white rounded-[24px] border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen01 className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl text-blue-800">Customized college lists</CardTitle>
              <CardDescription className="text-gray-700">
                Get a custom college list tailored to your student's interests and record, created by an admissions expert. Available junior year February.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white rounded-[24px] border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users01 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl text-blue-800">Quick questions</CardTitle>
              <CardDescription className="text-gray-700">
                Receive written answers to your specific questions through this special tool — experts post replies within two business days.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white rounded-[24px] border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <GraduationHat01 className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl text-blue-800">Financial guidance</CardTitle>
              <CardDescription className="text-gray-700">
                Explore saving-for-college options, no matter your child's age. Our financial aid experts are ready to help at any stage.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of students who have transformed their college experience with our coaching
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
              onClick={handleScheduleClick}
            >
              Schedule Your First Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg"
              onClick={handleTutoringClick}
            >
              Book Tutoring
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Logo variant="vector" className="h-6 text-blue-400" />
              </div>
              <p className="text-gray-400">
                Empowering students to reach their full potential through personalized coaching and guidance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Academic Coaching</li>
                <li>Career Planning</li>
                <li>Study Skills</li>
                <li>Time Management</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Resources</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@brighthorizons.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Hours: Mon-Fri 9AM-6PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Bright Horizons. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showModal && modalType === 'coaching' && (
        <CoachingFormModal onClose={handleCloseModal} />
      )}
      {showModal && modalType === 'tutoring' && (
        <TutoringFormModal 
          onClose={handleCloseModal} 
          onCreditsPurchased={handleCreditsPurchased}
        />
      )}
      <MessageModal 
        isOpen={showMessageModal} 
        onClose={() => setShowMessageModal(false)} 
      />
      
      {/* Appointments Modal */}
      {showAppointmentsModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/20 transition-opacity duration-300 ease-out-quart" onClick={() => setShowAppointmentsModal(false)} />
          
          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 ease-out-quart">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
                <button
                  onClick={() => setShowAppointmentsModal(false)}
                  className="rounded-full p-1 hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Content */}
              <div className="px-6 py-8">
                <div className="text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h3>
                  <p className="text-sm text-gray-500">
                    You don't have any scheduled appointments at the moment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
