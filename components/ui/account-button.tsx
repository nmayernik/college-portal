"use client"

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
    <div className={`relative ${className}`} data-name="Account">
      {/* Base background */}
      <div className="absolute bg-[#f2f2f2] bottom-0 right-0 rounded-[100px] top-0 w-[129px]" data-name="Base" />
      
      {/* Avatar circle with initials */}
      <div className="absolute bottom-0 left-0 overflow-clip right-[67.44%] top-0" data-name="Avatar">
        <div className="absolute inset-0 bg-[#1a475f] rounded-full flex items-center justify-center" data-name="Oval">
          <div className="font-['Mulish:ExtraBold',_sans-serif] font-extrabold leading-[0] text-[#ffffff] text-[15px] text-nowrap text-center uppercase">
            {initials}
          </div>
        </div>
      </div>
      
      {/* Account text */}
      <div className="absolute font-['Mulish:Bold',_sans-serif] font-bold leading-[0] left-[113px] text-[#1a475f] text-[14px] text-nowrap text-right translate-x-[-100%]" style={{ top: "calc(50% - 9px)" }}>
        {accountText}
      </div>
    </div>
  )
}
