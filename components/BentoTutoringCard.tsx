"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, BookOpen, Users } from "lucide-react"

interface BentoTutoringCardProps {
  onTutoringClick: () => void
  purchasedCredits?: number
  purchasedProvider?: string
}

export default function BentoTutoringCard({ onTutoringClick, purchasedCredits, purchasedProvider }: BentoTutoringCardProps) {
  return (
    <Card className="bg-white rounded-[24px] border border-gray-200 shadow-sm h-full">
      <CardContent className="p-8 h-full">
                <div className="flex items-center justify-between">
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-[#1a475f] leading-tight mb-4">
                Tutoring Covered by Your Benefit
              </h2>
              {purchasedCredits && purchasedProvider ? (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800 mb-1">
                    ✓ {purchasedCredits} tutoring hours purchased
                  </p>
                  <p className="text-xs text-green-700">
                    Provider: {purchasedProvider}
                  </p>
                </div>
              ) : (
                <p className="text-base text-gray-700 leading-relaxed">
                  Convert your backup care credits for expert tutoring from Sylvan Learning and Revolution Prep. Get personalized academic support for your child.
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Grades K-College</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BookOpen className="w-4 h-4 text-green-600" />
                <span>All Subjects</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4 text-purple-600" />
                <span>Expert Tutors</span>
              </div>
            </div>
          </div>
          
          <div className="ml-6 flex-shrink-0">
            <Button
              onClick={onTutoringClick}
              variant="outline"
              size="lg"
              className="font-semibold"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Book Tutoring
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
