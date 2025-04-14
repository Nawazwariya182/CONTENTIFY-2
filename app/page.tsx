/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
// app\page.tsx
import Header from "@/components/header"
import Hero from "@/components/hero"
import StatusBar from "@/components/status-bar"
import Features from "@/components/features"
import Showcase from "@/components/showcase"
import CallToAction from "@/components/call-to-action"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      <Header />
      <Hero />
      <StatusBar />
      <Features />
      <Showcase />
      <CallToAction />
      <Footer />
    </main>
  )
}

