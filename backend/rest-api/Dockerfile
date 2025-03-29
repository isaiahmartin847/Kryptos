# Build stage
FROM golang:1.23-alpine AS builder

# Install required build tools
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Copy go.mod and go.sum
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build a static Go binary for the REST API (cmd/app is your entry point)
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o rest-api ./cmd/app

# Final production stage
FROM alpine:latest

# Add ca-certificates for HTTPS requests
RUN apk --no-cache add ca-certificates

# Set working directory
WORKDIR /root/

# Copy the binary from the builder stage
COPY --from=builder /app/rest-api .

# Copy the .env file for testing purposes (you can remove this later)
COPY .env .env

# Expose the port the REST API will run on
EXPOSE 8080

# Run the REST API application
CMD ["./rest-api"]
