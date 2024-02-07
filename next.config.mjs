/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "utfs.io" }],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
