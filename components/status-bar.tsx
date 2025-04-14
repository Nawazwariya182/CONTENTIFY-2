/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const statusItems = [
  "🤖 Advanced AI Content Generation",
  "📝 Creates High-Quality Content in Seconds",
  "🎯 SEO-Optimized Output",
  "🔄 Multiple Content Formats",
  "✨ Natural Language Processing",
  "📊 Smart Content Analytics"
]

export default function StatusBar() {
  const barRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the status bar on load
      gsap.from(barRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: barRef.current,
          start: "top bottom",
        },
      })

      // Create the scrolling text animation
      gsap.to(textRef.current, {
        x: "-50%",
        repeat: -1,
        duration: 20,
        ease: "linear",
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={barRef}
      className="relative w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-md border-y border-blue-800/30 overflow-hidden py-4"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent)]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="overflow-hidden whitespace-nowrap">
          <div ref={textRef} className="inline-block whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="inline-block">
                {statusItems.map((item, index) => (
                  <span key={index} className="inline-block mx-8 text-gray-300 font-medium">
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

