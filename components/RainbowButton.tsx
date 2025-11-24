"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"

interface RainbowButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
  target?: string
  static?: boolean
}

export function RainbowButton({
  children,
  onClick,
  href,
  className = "",
  target,
  static: isStatic,
}: RainbowButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [speed, setSpeed] = useState(8)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isStatic) return

    if (isHovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      intervalRef.current = setInterval(
        () => {
          setSpeed((prevSpeed) => {
            const newSpeed = Math.max(0.5, prevSpeed * 0.75) // Speed up by 25% each half lap
            return newSpeed
          })
        },
        (speed * 1000) / 2,
      ) // Divide by 2 to trigger every half lap
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setSpeed(8)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovered, speed, isStatic])

  const content = (
    <div
      className={`relative group isolate p-[1px] rounded-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isStatic ? (
        // Static rainbow border - no spinning, always visible
        <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#ff0000_0%,#ffff00_14%,#00ff00_28%,#00ffff_42%,#0000ff_56%,#ff00ff_70%,#ff0000_84%,#ffff00_100%)] opacity-100" />
      ) : (
        // Animated rainbow border - spins on hover
        <div
          className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#ff0000_60%,#ffff00_67%,#00ff00_74%,#00ffff_81%,#0000ff_88%,#ff00ff_95%,#ff0000_100%)] opacity-100"
          style={{
            animation: `spin ${speed}s linear infinite`,
          }}
        />
      )}

      <div className="relative z-10 bg-[#141414] rounded-full px-6 py-3 flex items-center justify-center transition-transform active:scale-95">
        <span className="text-white/80 group-hover:text-white font-light text-sm tracking-wider transition-colors">
          {children}
        </span>
      </div>
    </div>
  )

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className="block w-full"
      >
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className="block w-full outline-none">
      {content}
    </button>
  )
}
