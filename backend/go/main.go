package main

import (
	handler "event_backend/handlers" // Adjust this import path based on your module name
	"log"
	"net/http"

	"github.com/joho/godotenv"
)

func main() {
	// Load the .env file
	err := godotenv.Load(".env") // Load .env from the current directory
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	// Initialize your handlers
	http.HandleFunc("/api/signup", handler.SignupHandler)
	http.HandleFunc("/api/login", handler.LoginHandler)
	http.HandleFunc("/api/image_upload", handler.ImageUploadHandler)
	http.HandleFunc("/payment", handler.PaymentHandler) // Now correctly references the exported handler

	// Start the server on port 8080
	log.Println("Starting server on port 8080...")
	err = http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatalf("Could not start server: %s", err)
	}
}
