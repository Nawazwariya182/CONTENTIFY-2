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
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const showcaseItems = [
  {
    title: "Text-to-Content Generation",
    description: "Transform simple prompts into well-structured, engaging content using advanced AI algorithms.",
    image: "/g2.webp",
  },
  {
    title: "Smart Content Optimization",
    description: "Automatically enhance your content's readability, SEO performance, and engagement metrics with AI.",
    image: "/g1.webp",
  },
  {
    title: "Multi-Format Content Creation",
    description: "Generate blog posts, social media content, and marketing copy with AI-powered content suggestions.",
    image: "/g.webp",
  },
]

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

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

      // Animate showcase items
      itemRefs.current.forEach((item, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=100",
            end: "bottom top+=100",
            scrub: 1,
          },
        })

        // Different animation based on index (alternating)
        if (index % 2 === 0) {
          tl.from(item, {
            x: -100,
            opacity: 0,
            duration: 1,
          })
        } else {
          tl.from(item, {
            x: 100,
            opacity: 0,
            duration: 1,
          })
        }

        // Add hover animation
        const hoverTl = gsap.timeline({ paused: true })
        const showcaseImage = item?.querySelector(".showcase-image")
        if (showcaseImage) {
          hoverTl.to(showcaseImage, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          })
        }

        // Add event listeners for hover
        item?.addEventListener("mouseenter", () => hoverTl.play())
        item?.addEventListener("mouseleave", () => hoverTl.reverse())
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-white"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-7xl md:text-8xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
          >
            Showcase
          </h2>
          <p className="text-gray-900 max-w-2xl mx-auto text-lg">
            Explore what you can build with our platform. From interactive dashboards to immersive 3D experiences.
          </p>
        </div>

        <div className="space-y-24">
          {showcaseItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative overflow-hidden rounded-xl border border-slate-700/50 shadow-xl">
                  <div className="showcase-image w-full aspect-video relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl md:text-3xl sm:text-xl font-bold mb-4 text-black">{item.title}</h3>
                <p className="text-gray-900 text-lg mb-6">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

