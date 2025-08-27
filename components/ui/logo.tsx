"use client"

interface LogoProps {
  variant?: 'image' | 'vector'
  className?: string
}

export default function Logo({ variant = 'image', className = '' }: LogoProps) {
  if (variant === 'vector') {
    return (
      <div className={className}>
        <svg 
          width="189" 
          height="32" 
          viewBox="0 0 189 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="block max-w-none"
        >
          {/* Bright Horizons Vector - extracted from Figma */}
          <text 
            x="50%" 
            y="50%" 
            dominantBaseline="middle" 
            textAnchor="middle"
            className="text-2xl font-bold fill-blue-600"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '24px',
              fontWeight: '700',
              fill: 'currentColor'
            }}
          >
            Bright Horizons
          </text>
        </svg>
      </div>
    )
  }

  return (
    <div className={className}>
      <img src="/BHLogo@2x.png" alt="BH Logo" width="189" height="32" />
    </div>
  )
}