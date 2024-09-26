'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import UsageTrack from './UsageTrack'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Search } from 'lucide-react'

function Header({onSearchInput}:any) {
  const path = usePathname()

  return (
    <div className='relative flex p-4 items-center justify-between bg-secondary shadow-sm'>
      {/* Logo and Dropdown for Small Devices */}
      <div className='relative flex-shrink-0 z-10'>
        {/* Dropdown Menu for Small Screens */}
        <div className='block md:hidden'>
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center py-3 px-4 text-sm font-medium text-gray-800 focus:outline-none">
              <Link href={"/dashboard"}>
              <Image src={'/logo.svg'} width={50} height={50} alt='Logo' style={{ cursor: 'url(/poin.png), auto' }} />
              </Link>
              {/* <ChevronDownIcon className="h-5 w-5 ml-2" /> */}
            </Menu.Button>
            <Menu.Items className="absolute left-0 top-full mt-2 w-48 bg-white shadow-md rounded-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link href="/dashboard">
                    <div className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}>Home</div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href="/dashboard/History">
                    <div className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}>History</div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href="/dashboard/How">
                    <div className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}>How it Works?</div>
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
          
        </div>
        
        {/* Static Logo for Medium and Large Screens */}
        <div className='hidden md:block'>
          <Link href={"/dashboard"}>
          <Image src={'/logo.svg'} width={50} height={50} alt='Logo' style={{ cursor: 'url(/poin.png), auto' }}/>
          </Link>
        </div>
      </div>

      {/* Desktop Menu */}

      {/* User Button */}
      <div className='flex gap-6 z-100'>
      <ul className='hidden md:flex gap-6 items-center z-10'>
        <Link href={"/dashboard"}>
          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' ? 'text-primary font-extrabold' : ''}`}style={{ cursor: 'url(/poin.png), auto' }}>Home</li>
        </Link>
        <Link href={"/dashboard/History"}>
          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/History' ? 'text-primary font-extrabold' : ''}`}style={{ cursor: 'url(/poin.png), auto' }}>History</li>
        </Link>
        <Link href={"/dashboard/How"}>
          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/How' ? 'text-primary font-extrabold': ''}`}style={{ cursor: 'url(/poin.png), auto' }}>How it Works?</li>
        </Link>
      </ul>
        <UserButton />
      </div>

      {/* Usage Track - Move to Front */}
      <div className='fixed bottom-16 right-1 w-50 h-20 z-30'>
        <UsageTrack />
      </div>
    </div>
  )
}

export default Header
