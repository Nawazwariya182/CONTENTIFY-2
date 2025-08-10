/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name "Contentify" — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
import withBundleAnalyzerInit from '@next/bundle-analyzer';
/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['cdn-icons-png.flaticon.com']
    },
    transpilePackages: ['three'],
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
};


const withBundleAnalyzer = withBundleAnalyzerInit({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

export default withBundleAnalyzer(nextConfig);
