# Build stage
FROM golang:1.23-alpine AS builder

# Install required build tools
RUN apk add --no-cache git

# Install Air for hot reloading from the correct repository
RUN go install github.com/air-verse/air@latest

# Set working directory
WORKDIR /app

# Copy go.mod and go.sum
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Development stage
FROM builder AS dev

# Set working directory
WORKDIR /app

# Copy the existing Air configuration
COPY .air.toml .

# Expose port
EXPOSE 8080

# Command to run the application with Air
CMD ["air"]
