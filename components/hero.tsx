/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name "Contentify" — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Spline from "@splinetool/react-spline"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [splineLoaded, setSplineLoaded] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          ctaRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6",
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col lg:py-0 sm:py-[100px] items-center justify-center px-4 sm:px-6 overflow-hidden bg-white"
    >
      {/* Optimized background gradients using CSS variables */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(circle at center, rgba(30, 64, 175, 0.2), transparent, transparent)'
          }}
        />
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl"
          style={{
            background: 'rgba(59, 130, 246, 0.1)',
            transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
            willChange: 'transform'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl"
          style={{
            background: 'rgba(168, 85, 247, 0.1)',
            transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
            willChange: 'transform'
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 items-center">
          <div className="flex flex-col items-start space-y-8">
            <h1 ref={titleRef} className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="block text-black">Elevate Your</span>
              <span 
                className="block text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(to right, rgb(96, 165, 250), rgb(168, 85, 247))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text'
                }}
              >
                Digital Experience
              </span>
            </h1>

            <p ref={subtitleRef} className="text-lg md:text-xl sm:text-base text-gray-900 max-w-xl leading-relaxed">
              Create stunning, interactive web experiences with our powerful platform. Seamlessly blend animations, 3D
              elements, and modern design.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" prefetch={true}>
                <Button 
                  aria-label="Get Started" 
                  className="px-8 py-6 sm:px-4 sm:py-5 text-white font-medium rounded-md text-base transition-all duration-200 ease-out"
                  style={{
                    background: 'linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234))',
                    transform: 'translate3d(0, 0, 0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, rgb(37, 99, 235), rgb(126, 34, 206))'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234))'
                  }}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex justify-center items-center sm:h-[500px] w-full lg:h-[800px] relative">
            {/* Simple loading skeleton */}
            {!splineLoaded && (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="sm1:w-full sm1:h-full md1:w-full md1:h-full lg:w-[500px] lg:h-[500px] bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            )}
            
            <Spline
              scene="https://prod.spline.design/d01lHaVeXbRQ9FWU/scene.splinecode"
              className={`w-full h-full transition-opacity duration-500 ${splineLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setSplineLoaded(true)}
              style={{
                transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
                willChange: 'transform'
              }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm text-gray-900 mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-900 rounded-full flex justify-center">
          <div 
            className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2"
            style={{
              animation: 'bounce 1s infinite',
              transform: 'translate3d(0, 0, 0)'
            }}
          ></div>
        </div>
      </div>
    </section>
  )
}
