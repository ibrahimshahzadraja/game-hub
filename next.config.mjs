/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
      images: {
        remotePatterns: [
            new URL("https://cdn.akamai.steamstatic.com/steam/apps/**"),
            new URL("https://upload.wikimedia.org/wikipedia/**"),
        ],
    },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
