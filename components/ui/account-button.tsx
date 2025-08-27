"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface AccountButtonProps {
  className?: string
  initials?: string
  accountText?: string
}

export default function AccountButton({ 
  className = "", 
  initials = "PS", 
  accountText = "Account" 
}: AccountButtonProps) {
  return (
    <div className={`relative flex items-center ${className}`} data-name="Account">
      {/* Base background */}
      <div className="absolute bg-[#f2f2f2] bottom-0 right-0 rounded-full top-0 w-[129px]" data-name="Base" />
      
      {/* Avatar with initials */}
      <div className="relative z-10">
        <Avatar className="h-10 w-10 bg-[#1a475f]">
          <AvatarFallback className="bg-[#1a475f] text-white font-mulish font-semibold text-sm uppercase">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
      
      {/* Account text */}
      <div className="relative z-10 ml-3 font-mulish font-semibold text-[#1a475f] text-[14px]">
        {accountText}
      </div>
    </div>
  )
}
