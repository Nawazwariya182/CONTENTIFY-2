"use client"

import type React from "react"

import { createContext, useState, type ReactNode } from "react"

interface TotalUsageContextType {
  totalUsage: number
  setTotalUsage: (usage: number | ((prev: number) => number)) => void
}

const TotalUsageContext = createContext<TotalUsageContextType>({
  totalUsage: 0,
  setTotalUsage: () => {},
})

interface TotalUsageProviderProps {
  children: ReactNode
}

const TotalUsageProvider: React.FC<TotalUsageProviderProps> = ({ children }) => {
  const [totalUsage, setTotalUsage] = useState<number>(0)

  return <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>{children}</TotalUsageContext.Provider>
}

export { TotalUsageContext, TotalUsageProvider }
