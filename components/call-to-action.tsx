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
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the CTA section
      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top bottom-=100",
        },
      })

      // Add hover animation to the button
      const button = contentRef.current?.querySelector("button")
      if (button) {
        const hoverTl = gsap.timeline({ paused: true })
        hoverTl.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        })

        button.addEventListener("mouseenter", () => hoverTl.play())
        button.addEventListener("mouseleave", () => hoverTl.reverse())
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="pricing" ref={sectionRef} className="py-24 bg-white px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-blue-900/10 to-slate-900/0" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div ref={contentRef} className="relative">
          <div className="absolute -inset-1 bg-second rounded-2xl blur-xl opacity-70" />
          <div className="relative bg-second backdrop-blur-lg border border-slate-700/50 rounded-xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl sm:text-2xl font-bold mb-6 text-black/80">Ready to Transform Your Content Creation Experience?</h2>
            <p className="text-gray-900 max-w-2xl mx-auto mb-8 text-lg sm:text-base">
              Experience the power of AI-driven content creation. Transform your ideas into engaging content 
              with just a few clicks, saving time and resources.
            </p>

            <Button className="px-8 py-6 sm:px-5 sm:py-3 sm:text-base bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-md text-lg">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* <p className="text-gray-400 text-sm mt-4">No credit card required. 14-day free trial.</p> */}
          </div>
        </div>
      </div>
    </section>
  )
}

