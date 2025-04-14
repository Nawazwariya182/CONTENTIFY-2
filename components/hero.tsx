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
import Image from "next/image"
import Link from "next/link"
import Spline from '@splinetool/react-spline';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        url: string;
      }, HTMLElement>;
    }
  }
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

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
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 items-center">
          <div className="flex flex-col items-start space-y-8">
            <h1 ref={titleRef} className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="block text-black">Elevate Your</span>
              <span className="block bg-gradient-to-r  from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Digital Experience
              </span>
            </h1>

            <p ref={subtitleRef} className="text-lg md:text-xl sm:text-base text-gray-900 max-w-xl leading-relaxed">
              Create stunning, interactive web experiences with our powerful platform. Seamlessly blend animations, 3D
              elements, and modern design.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
              <Button className="px-8 py-6 sm:px-4 sm:py-5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-md text-base">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              </Link>
            </div>
          </div>
            <div className="flex justify-center items-center sm:h-[500px] w-full lg:h-[800px] relative">
              <Spline
              scene="https://prod.spline.design/d01lHaVeXbRQ9FWU/scene.splinecode"
              className="w-full h-full"
              />
            </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm text-gray-900 mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-900 rounded-full flex justify-center">
          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </section>
  )
}

