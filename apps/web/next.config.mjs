/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    serverActions: true
  },
  eslint: {
    dirs: ["app", "components", "lib"]
  }
};

export default nextConfig;
