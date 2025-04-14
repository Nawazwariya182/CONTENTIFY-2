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
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Zap, Layers, Palette, Globe, Code, Shield } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: "Instant AI Generation",
    description: "Transform your ideas into content with advanced AI generation, powered by cutting-edge language models.",
    icon: Zap,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Multi-Format Content",
    description: "Generate diverse content types including blog posts, social media, articles, and marketing copy.",
    icon: Layers,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    title: "Smart Content Enhancement",
    description: "AI-powered suggestions and improvements to make your content more engaging and effective.",
    icon: Palette,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Multi-Language Support",
    description: "Create and translate content in multiple languages to reach a global audience effortlessly.",
    icon: Globe,
    color: "from-pink-500 to-pink-600",
  },
  {
    title: "Easy Integration",
    description: "Seamlessly integrate AI content generation into your existing workflow and platforms.",
    icon: Code,
    color: "from-cyan-500 to-cyan-600",
  },
  {
    title: "Content Protection",
    description: "Advanced plagiarism detection and content authenticity verification built-in.",
    icon: Shield,
    color: "from-emerald-500 to-emerald-600",
  },
]

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
        },
      })

      // Animate features
      featureRefs.current.forEach((feature, index) => {
        gsap.from(feature, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: feature,
            start: "top bottom-=50",
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h1
            ref={titleRef}
            className="text-5xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
          >
            Powerful Features
          </h1>
            <p className="text-gray-900 max-w-2xl mx-auto text-lg sm:text-base">
            Leverage advanced AI technology to generate high-quality, engaging content across multiple formats and languages with just a few clicks.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} ref={(el) => {featureRefs.current[index] = el}} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
              <div className="relative bg-second backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl h-full flex flex-col">
                <div className={`mb-4 p-3 rounded-lg bg-gradient-to-r ${feature.color} w-fit`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black group-hover:text-black/70 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-sm group-hover:text-gray-600 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

