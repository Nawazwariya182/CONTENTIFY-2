'use client'

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useRef, useEffect } from 'react'
import UsageTrack from './UsageTrack'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Menu, Home, History, HelpCircle } from "lucide-react"

function Header() {
  const path = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const menuItems = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/dashboard/History", label: "History", icon: History },
    { href: "/dashboard/How", label: "How", icon: HelpCircle },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container flex h-16 max-w-screen-2xl items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Link href="/dashboard" className='flex items-center space-x-2' style={{ cursor: 'url(/poin.png), auto' }}>
              <Image src='/logo.svg' width={40} height={40} alt='Logo' className="rounded-full" />
              <span className='hidden font-bold text-xl sm:inline-block'>AI Content Creator</span>
            </Link>
          </div>

          <nav className='hidden md:flex items-center space-x-1'>
            {menuItems.map((item) => (
              <Button
                key={item.href}
                variant={path === item.href ? "secondary" : "ghost"}
                className="h-9 px-4"
                asChild
                style={{ cursor: 'url(/poin.png), auto' }}
              >
                <Link href={item.href} >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>

          <div className='flex items-center space-x-4' style={{ cursor: 'url(/poin.png), auto' }}>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'h-9 w-9'
                }
              }}
            />
            <div className="relative md:hidden" ref={dropdownRef}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background border border-border">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {menuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`${
                          path === item.href ? 'bg-second' : ''
                        } flex items-center px-4 py-2 text-sm text-foreground hover:bg-second transition-colors`}
                        onClick={() => setIsOpen(false)}
                        style={{ cursor: 'url(/poin.png), auto' }}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* UsageTrack Component positioned at bottom-right corner of the whole screen */}
      <div className='fixed bottom-4 right-4 sm:block z-50'>
        <UsageTrack />
      </div>
    </>
  )
}

export default Header