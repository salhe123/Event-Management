# Use the official Go image as the base image
FROM golang:1.23.2 AS builder

# Set the current working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of your application code
COPY . .

# Build the Go application
RUN go build -o main .

# Start a new stage from a smaller image
FROM alpine:latest  

# Set the working directory
WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /app/main .

# Expose port 7070 to the outside world
EXPOSE 7070

# Command to run the executable
CMD ["./main"]
