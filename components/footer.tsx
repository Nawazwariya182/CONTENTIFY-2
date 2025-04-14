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

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Github, ArrowRight } from "lucide-react"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer elements
      gsap.from(logoRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom-=100",
        },
      })

      if (linksRef.current && linksRef.current.children.length > 0) {
        gsap.from(linksRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom-=100",
          },
        })
      }

      gsap.from(formRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom-=100",
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const [email, setEmail] = useState("")

  const handleSubscribe = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address")
      return
    }

    // Here you would typically send this to your backend API
    console.log("Subscribing email:", email)
    alert("Thanks for subscribing!")
    setEmail("")
  }

  return (
    <footer ref={footerRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-800 relative">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div ref={logoRef} className="md:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
               CONTENTIFY
              </span>
            </Link>
            <p className="text-gray-800 sm:text-sm mt-4 mb-6">
              Transform your content strategy with our AI-powered generation platform. Create engaging, SEO-optimized content in seconds.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-800 hover:text-black transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-black transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-black transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-black transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-800 hover:text-black transition-colors duration-300" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div ref={formRef} className="md:col-span-1">
            <h4 className="text-black font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-900 mb-4">Subscribe to our newsletter for the latest updates and news.</p>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative flex">
                <input
                  type="email"
                  placeholder="Your email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-second rounded-l-lg text-black focus:outline-none focus:ring-2 focus:ring-second focus:border-transparent"
                />
                <Button 
                  onClick={handleSubscribe}
                  className="rounded-l-none bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
                </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-800 text-sm">© {new Date().getFullYear()} CONTENTIFY. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-800 hover:text-white text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-800 hover:text-white text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-800 hover:text-white text-sm transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// function useState(arg0: string): [any, any] {
//   throw new Error("Function not implemented.")
// }

