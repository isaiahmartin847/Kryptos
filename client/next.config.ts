import type { NextConfig } from "next";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const nextConfig: NextConfig = {
  experimental: {
    // Allow requests from app.localhost
    allowedDevOrigins: ["http://app.localhost:3000"],
  },
};

export default nextConfig;
