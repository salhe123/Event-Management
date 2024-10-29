package main

import (
	handler "event_backend/handlers" // Adjust this import path based on your module name
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/api/signup", handler.SignupHandler)
	http.HandleFunc("/api/login", handler.LoginHandler)

	// Start the server on port 8080
	log.Println("Starting server on port 8080...")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatalf("Could not start server: %s", err)
	}
}
