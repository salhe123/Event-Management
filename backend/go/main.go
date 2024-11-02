package main

import (
	handler "event_backend/handlers" // Adjust this import path based on your module name
	"log"
	"net/http"

	"github.com/joho/godotenv" // Make sure to import godotenv
)

func main() {
	// Load the .env file
	err := godotenv.Load(".env") // Load .env from the current directory
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	// Initialize your handlers (e.g., ImageUploadHandler) here
	http.HandleFunc("/api/signup", handler.SignupHandler)
	http.HandleFunc("/api/login", handler.LoginHandler)
	http.HandleFunc("/api/image_upload", handler.ImageUploadHandler) // Add this line

	// Start the server on port 8080
	log.Println("Starting server on port 8080...")
	err = http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatalf("Could not start server: %s", err)
	}
}
