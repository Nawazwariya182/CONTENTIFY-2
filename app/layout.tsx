/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name "Contentify" — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Poppins } from 'next/font/google'
import SuppressConsole from './errsurpass';
import Script from "next/script";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "ContentiFy",
  description: "Created by NW",
  icons: '/logo1.svg',
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://prod.spline.design" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://adjusted-flea-33.clerk.accounts.dev" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          <Script
            src="https://www.google-analytics.com/analytics.js"
            strategy="lazyOnload"
          />

          {/* Example Clerk SDK lazy load */}
          <Script
            src="https://adjusted-flea-33.clerk.accounts.dev/npm/@clerk/clerk-js@5.67.5/dist/clerk.browser.js"
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />
        </head>
        <body className={poppins.className}>
          <SuppressConsole />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
