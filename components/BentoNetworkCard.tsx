"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users01, Calendar, MessageChatCircle } from "@untitledui/icons"

interface BentoNetworkCardProps {
  onMessageClick: () => void
  onScheduleClick: () => void
}

export default function BentoNetworkCard({ onMessageClick, onScheduleClick }: BentoNetworkCardProps) {
  return (
    <Card className="bg-white rounded-[24px] border border-gray-200 shadow-sm h-full">
      <CardContent className="p-8 h-full flex flex-col justify-between">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#1a475f] leading-tight mb-4">
              Our network of experts is here for you at every step
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Connect with former college admissions officers and college finance experts from top universities across the country.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 mt-6">
          <Button
            onClick={onMessageClick}
            variant="outline"
            size="lg"
            className="w-full font-semibold"
          >
            <MessageChatCircle className="mr-2 h-4 w-4" />
            Message Us
          </Button>
          <Button
            onClick={onScheduleClick}
            variant="outline"
            size="lg"
            className="w-full font-semibold"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Call
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
