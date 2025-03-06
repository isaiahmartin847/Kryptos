# Base stage with dependencies
FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@10.8.2  # Downgrade npm to a compatible version
RUN npm install

# Copy the .env file into the container
COPY .env .env

# Copy the rest of the application files
COPY . .
EXPOSE 3000

# Development stage
FROM base as dev
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

# Production stage
# FROM base as prod
# ENV NODE_ENV=production
# RUN npm install --only=production
# CMD ["npm", "run", "start"]
