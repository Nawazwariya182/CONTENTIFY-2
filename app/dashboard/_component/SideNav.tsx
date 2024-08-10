'use client'
import React from 'react'
import Image from 'next/image'
import { FileClock, Home, Settings, WalletCards } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import UsageTrack from './UsageTrack'
// import UsageTrack from './UsageTrack'
function SideNav() {
  const MenuList = [
    {
      name:"Home",
      icon:Home,
      path:"/dashboard"
    },
    {
      name:"History",
      icon:FileClock,
      path:"/dashboard/History"
    },
    {
      name:"Setting",
      icon:Settings,
      path:"/dashboard/settings"
    }
  ]
  const path = usePathname()
  
  return (
    <div className='h-screen relative p-5 shadow-sm border bg-white border-1 border-gray-300'>
      <div className='flex justify-center'>
        <Link href={'/dashboard'}>
          <Image src={'/logo.svg'} alt='logo' width={60} height={60}/>
        </Link>
      </div>
      <hr className='my-6 border'/>
      <div className='mt-3'>
        {MenuList.map((menu, index)=>(
          <Link href={menu.path} key={index}>
          <div className={` font-p gap-2 flex g-2 mb-2 p-3
          hover:bg-primary hover:text-white rounded-lg
          cursor-pointer item-center
          ${path==menu.path&&'bg-primary text-white'}
          `}>
            <menu.icon className='h-6 w-6'/>
            <h2 className='text-lg'>{menu.name}</h2>
          </div>
          </Link>
        ))}
      </div>
      <div className='absolute bottom-10 left-0 w-full'>
        {<UsageTrack/>}
      </div>
    </div>
  )
}

export default SideNav