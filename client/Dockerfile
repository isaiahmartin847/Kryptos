# Base stage with dependencies
FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

# Development stage
FROM base as dev
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]
