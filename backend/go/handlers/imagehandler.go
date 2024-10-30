package handlers

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"path/filepath"

	"github.com/google/uuid"
)

// ImageUploadInput defines the input structure for the image upload action
type ImageUploadInput struct {
	File   string `json:"file"`
	UserID string `json:"user_id"`
}

// ImageUploadOutput defines the output structure for the image upload action
type ImageUploadOutput struct {
	URL     string `json:"url"`
	Message string `json:"message"`
}

// UploadHandler handles the image upload requests
func UploadHandler(w http.ResponseWriter, r *http.Request) {
	var input ImageUploadInput

	// Read the request body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}

	// Unmarshal the input data
	err = json.Unmarshal(body, &input)
	if err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	// Process the base64 image
	imageData, err := base64Decode(input.File)
	if err != nil {
		http.Error(w, "Invalid image data", http.StatusBadRequest)
		return
	}

	// Create a unique filename
	filename := fmt.Sprintf("%s.jpg", uuid.New().String())
	filePath := filepath.Join("uploads", filename)

	// Save the image to the filesystem
	err = ioutil.WriteFile(filePath, imageData, 0644)
	if err != nil {
		http.Error(w, "Failed to save image", http.StatusInternalServerError)
		return
	}

	// Return the URL and a success message
	output := ImageUploadOutput{
		URL:     fmt.Sprintf("http://localhost:8080/uploads/%s", filename), // Adjust as necessary
		Message: "Image uploaded successfully.",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(output)
}

// base64Decode decodes a base64 string to bytes
func base64Decode(data string) ([]byte, error) {
	// Remove the prefix if present
	if len(data) > 22 && data[:22] == "data:image/jpeg;base64," {
		data = data[22:]
	}

	return base64.StdEncoding.DecodeString(data)
}
