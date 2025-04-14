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

import Spline from '@splinetool/react-spline/next';
import { SignIn } from "@clerk/nextjs"
export default function Page() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
          <Spline
            scene="https://prod.spline.design/d01lHaVeXbRQ9FWU/scene.splinecode"
          />

          <div className="flex flex-col items-center justify-center p-8 bg-black/20 backdrop-blur-sm rounded-xl shadow-xl order-1 lg:order-2">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-slate-300">Sign in to continue to your account</p>
            </div>
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
              <SignIn />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
