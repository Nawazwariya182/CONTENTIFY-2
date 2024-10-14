import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn-icons-png.flaticon.com']
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });
    return config;
  },
  env: {
    NEXT_PUBLIC_AIXPLAIN_API_KEY_1: process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY_1,
    NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY,
    NEXT_PUBLIC_DRIZZLE_DB_URL: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY:process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL:process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL:process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY:process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY,
    NEXT_PUBLIC_DRIZZLE_DB_URL:process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
    NEXT_PUBLIC_HUGGINGFACE_API_KEY:process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY,
    NEXT_PUBLIC_AIXPLAIN_API_KEY:process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY,
    NEXT_PUBLIC_AIXPLAIN_API_KEY_1:process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY_1,
    NEXT_PUBLIC_AIXPLAIN_API_KEY_2:process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY_2,
    NEXT_PUBLIC_AIXPLAIN_API_KEY_3:process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY_3,
    NEXT_PUBLIC_AIXPLAIN_API_KEY_4:process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY_4,
    NEXT_PUBLIC_AIXPLAIN_API_KEY_5:process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY_5,
    NEXT_PUBLIC_AIXPLAIN_API_KEY_6:process.env.NEXT_PUBLIC_AIXPLAIN_API_KEY_6,
  },
};

export default nextConfig;