# Use Node.js 18 (slim) as the base image for glibc compatibility
FROM node:18-slim as base

WORKDIR /app

# Install necessary dependencies for glibc compatibility
RUN apt-get update && apt-get install -y \
    libc6 \
    && rm -rf /var/lib/apt/lists/*

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies (including devDependencies for development)
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3000 for Next.js
EXPOSE 3000

# Development stage
FROM base as dev
ENV NODE_ENV=development
# Enable hot-reload and ensure the app is accessible externally
CMD ["npm", "run", "dev"]