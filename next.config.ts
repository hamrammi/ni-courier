import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("http://127.0.0.1:3003/public/**"),
      new URL("http://localhost:8080/assets/**"),
      new URL("http://localhost:8123/assets/**"),
    ]
  }
}

export default nextConfig
