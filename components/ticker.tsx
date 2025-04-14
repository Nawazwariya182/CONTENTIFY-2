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
import { motion } from "framer-motion"

const tickerItems = [
  "⚡ AI-Powered Content",
  "✨ Magic Prompting",
  "🌍 AI Translation",
  "📝 Grammar & Style Check",
  "📄 Multi-Format Export",
]

export default function Ticker() {
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tickerElement = tickerRef.current
    if (!tickerElement) return

    const tickerWidth = tickerElement.offsetWidth
    const tickerContentWidth = tickerElement.scrollWidth

    // Only apply animation if content is wider than container
    if (tickerContentWidth > tickerWidth) {
      tickerElement.style.animationDuration = `${tickerContentWidth / 50}s`
    }
  }, [])

  return (
    <div className="w-full bg-slate-800/50 backdrop-blur-md border-b border-slate-700/50 overflow-hidden fixed top-0 z-50">
      <div ref={tickerRef} className="py-2 flex items-center whitespace-nowrap animate-scroll">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex">
            {tickerItems.map((item, index) => (
              <motion.div
                key={index}
                className="mx-8 text-sm font-light text-slate-300"
                initial={{ opacity: 0.8 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

