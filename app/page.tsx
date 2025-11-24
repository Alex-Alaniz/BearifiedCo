"use client"

import { useState } from "react"
import DynamicFrameLayout from "../components/DynamicFrameLayout"
import { ppEditorialNewUltralightItalic, inter } from "./fonts"
import Link from "next/link"
import { IntakeForm } from "../components/IntakeForm"

export default function Home() {
  const [headerSize] = useState(1.2) // 120% is the default size
  const [textSize] = useState(0.8) // 80% is the default size
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div
      className={`min-h-screen bg-[#141414] flex items-center justify-center p-8 ${ppEditorialNewUltralightItalic.variable} ${inter.variable}`}
    >
      <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 md:gap-8">
        {/* Left Content */}
        <div className="w-full md:w-[260px] flex-shrink-0 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-16">
            <h1
              className={`${ppEditorialNewUltralightItalic.className} text-4xl md:text-6xl font-light italic text-white/80 tracking-tighter leading-[130%]`}
              style={{ fontSize: `${4 * headerSize}rem` }}
            >
              Bearified™
            </h1>
            <div
              className={`${inter.className} flex flex-col gap-12 text-white/50 text-sm font-light max-w-[300px]`}
              style={{ fontSize: `${0.875 * textSize}rem` }}
            >
              <div className="space-y-6">
                <div className="h-px bg-white/10 w-full" />
                <p>
                  Welcome to BearifiedCo™ Where innovation meets execution. We're your full-stack partner for AI,
                  Blockchain, IT, Design, Merch, and beyond. You envision the future—we build it.
                </p>
                <p>
                  When creativity meets technology, extraordinary happens. Our team specializes in transforming
                  visionary ideas into digital reality across multiple disciplines, from cutting-edge AI solutions to
                  blockchain innovations, comprehensive IT infrastructure, stunning design work, and custom merchandise.
                </p>
                <p>Here are some of our favorite creative works showcasing this philosophy.</p>
                <div className="h-px bg-white/10 w-full" />
              </div>
            </div>
            <Link
              href="https://www.bearified.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <div className="text-white/60 font-light text-sm tracking-wider">Bearified™ Labs</div>
            </Link>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-block px-6 py-3 text-white/70 border border-purple-500/50 rounded-full font-medium hover:bg-purple-500/10 transition-colors text-center w-full max-w-[260px] text-sm mt-16"
          >
            Work With Us
          </button>
        </div>

        {/* Right Content */}
        <div className="w-full md:flex-grow h-[60vh] md:h-[80vh]">
          <DynamicFrameLayout />
        </div>
      </div>

      {/* Intake Form Modal */}
      <IntakeForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  )
}
