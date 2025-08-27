"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface BentoEnrollmentCardProps {
  onScheduleClick: () => void
}

export default function BentoEnrollmentCard({ onScheduleClick }: BentoEnrollmentCardProps) {
  return (
    <div className="bg-white relative rounded-[24px] w-full max-w-[800px] mx-auto shadow-sm border border-gray-200">
      <div className="overflow-hidden relative w-full">
        <div className="relative h-[360px] w-full flex items-center">
          <div className="absolute h-52 left-8 rounded-[8px] w-[736px] max-w-[calc(100%-4rem)]">
            <div className="absolute box-border content-stretch flex flex-col gap-2 h-52 items-start justify-start left-0 pl-0 pr-6 py-0 top-0 w-[473px] max-w-[60%]">
              <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full">
                <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-full mb-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs font-medium">
                    Step One
                  </Badge>
                </div>
                <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-full">
                  <div className="basis-0 content-stretch flex gap-2 grow items-end justify-start min-h-px min-w-px relative shrink-0">
                    <div className="basis-0 flex flex-col font-semibold grow justify-end leading-[0] min-h-px min-w-px relative shrink-0 text-[#1a475f] text-2xl">
                      <p className="leading-[1.25]">Get started with an Intro to College Coach call</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-full mt-2">
                  <div className="basis-0 content-stretch flex gap-2 grow items-end justify-start min-h-px min-w-px relative shrink-0">
                    <div className="basis-0 flex flex-col grow justify-end leading-[0] min-h-px min-w-px relative shrink-0 text-gray-700 text-base">
                      <p className="leading-[1.4]">This is the best way to get started with our service</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    onClick={onScheduleClick}
                    className="font-semibold bg-yellow-500 text-blue-800 hover:bg-yellow-400 transition-colors duration-200"
                  >
                    Schedule now
                  </Button>
                </div>
              </div>
            </div>
            <div 
              className="absolute h-[248px] left-[485px] rounded-[16px] w-[247px] max-w-[40%] bg-center bg-no-repeat bg-cover"
              style={{ 
                backgroundImage: `url('/intro-call.png')`,
                backgroundSize: 'cover',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
