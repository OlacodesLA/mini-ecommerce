/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "@react-email/components",
      "@react-email/render",
      "@react-email/html",
      "@react-email/button",
    ],
  },
};

module.exports = nextConfig;
