/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
// components\header.tsx
"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
const navItems = [
  { name: "Features", href: "#features" },
  { name: "Dashboard", href: "/dashboard" },
]
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      if (navRef.current && navRef.current.children.length > 0) {
        gsap.from(Array.from(navRef.current.children), {
          y: -50,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        })
      }
      gsap.from(ctaRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      })
      gsap.to(headerRef.current, {
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "50px top",
          onEnter: () => {
            // headerRef.current?.classList.add("backdrop-blur-md", "shadow-lg")
            // headerRef.current?.classList.remove("bg-transparent")
          },
          onLeaveBack: () => {
            // headerRef.current?.classList.remove("backdrop-blur-md", "shadow-lg")
            // headerRef.current?.classList.add("bg-transparent")
          },
        },
      })
    })
    return () => ctx.revert()
  }, [])
  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-50 transition-all duration-300 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div ref={logoRef} className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                CONTENTIFY
              </span>
            </Link>
          </div>
          <div ref={navRef} className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-900 hover:text-gray-700 transition-colors duration-300 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div ref={ctaRef} className="hidden md:block">
            <Link href="/dashboard">
              <Button className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-md text-md">
                Get Started
                {/* <ArrowRight className="ml-2 h-5 w-5" /> */}
              </Button>
            </Link>
          </div>
          <div className="md:hidden">
            <button type="button" className="text-black hover:text-black/70" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <Link href="/dashboard">
                <Button className="px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-md text-lg">
                  Get Started
                  {/* <ArrowRight className="ml-2 h-5 w-5" /> */}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

