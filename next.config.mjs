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
  };
  
  export default nextConfig;