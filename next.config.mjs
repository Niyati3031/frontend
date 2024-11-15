/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.performance = {
        maxAssetSize: 1024 * 1024, // Set limit to 1MB or as needed
        maxEntrypointSize: 1024 * 1024,
      };
    }
    return config;
  },
};

export default nextConfig;
