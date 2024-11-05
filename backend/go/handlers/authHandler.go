package handlers

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	_ "github.com/lib/pq" // PostgreSQL driver
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte("your_secret_key") // Replace with your actual secret key

// SignupInput represents the input for signing up a user
type SignupInput struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

// LoginInput represents the input for logging in a user
type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// generateJWT creates a JWT token for the authenticated user
func generateJWT(userID string) (string, error) {
	claims := jwt.MapClaims{
		"sub": userID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
		"https://hasura.io/jwt/claims": map[string]interface{}{
			"x-hasura-user-id":       userID,
			"x-hasura-default-role":  "user",
			"x-hasura-allowed-roles": []string{"user"},
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtSecret) // Use the jwtSecret defined earlier
	if err != nil {
		return "", err
	}
	return tokenString, nil
}
func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*") // Set this to your frontend's origin
	w.Header().Set("Access-Control-Allow-Methods", "POST,GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

// SignupHandler handles user signup
func SignupHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	var input SignupInput

	// Decode the request body
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	// Hash the password
	hashedPassword, err := hashPassword(input.Password)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	// Create user in Hasura
	query := map[string]interface{}{
		"query": `
            mutation insertUser($first_name: String!, $last_name: String!, $email: String!, $password: String!) {
                insert_users(objects: {first_name: $first_name, last_name: $last_name, email: $email, password: $password}) {
                    returning {
                        id
                    }
                }
            }
        `,
		"variables": map[string]interface{}{
			"first_name": input.FirstName,
			"last_name":  input.LastName,
			"email":      input.Email,
			"password":   hashedPassword,
		},
	}

	// Send request to Hasura
	hasuraURL := "https://event-proj-2024.hasura.app/v1/graphql" // Replace with your Hasura endpoint
	body, err := json.Marshal(query)
	if err != nil {
		http.Error(w, "Failed to create query", http.StatusInternalServerError)
		return
	}

	req, err := http.NewRequest("POST", hasuraURL, bytes.NewBuffer(body))
	if err != nil {
		http.Error(w, "Failed to create request", http.StatusInternalServerError)
		return
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("x-hasura-admin-secret", "PwP8q7U2j2uG55r2l6jn22BH7cq6FhHIW27wKv4t6wvsrIt0p7V93NxzlJSx1E37")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, "Failed to send request to Hasura", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		http.Error(w, "Failed to create user", resp.StatusCode)
		return
	}

	// Return success response
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("User created successfully"))
}

// LoginHandler handles user login
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var input LoginInput

	// Decode the request body
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}
	log.Printf("Login attempt for email: %s", input.Email)

	// Query Hasura to check if the user exists
	query := map[string]interface{}{
		"query": `
            query getUser($email: String!) {
                users(where: {email: {_eq: $email}}) {
                    id
                    password
                }
            }
        `,
		"variables": map[string]interface{}{
			"email": input.Email,
		},
	}

	log.Printf("Request sent to Hasura for user check")
	// Send request to Hasura
	hasuraURL := "https://event-proj-2024.hasura.app/v1/graphql" // Replace with your Hasura endpoint
	body, err := json.Marshal(query)
	if err != nil {
		http.Error(w, "Failed to create query", http.StatusInternalServerError)
		return
	}

	req, err := http.NewRequest("POST", hasuraURL, bytes.NewBuffer(body))
	if err != nil {
		http.Error(w, "Failed to create request", http.StatusInternalServerError)
		return
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("x-hasura-admin-secret", "PwP8q7U2j2uG55r2l6jn22BH7cq6FhHIW27wKv4t6wvsrIt0p7V93NxzlJSx1E37") // Replace with your Hasura admin secret

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, "Failed to send request to Hasura", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	// Read response body for debugging
	respBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Failed to read response", http.StatusInternalServerError)
		return
	}

	// Log the response body for debugging
	log.Printf("Hasura response: %s", string(respBody))

	if resp.StatusCode != http.StatusOK {
		http.Error(w, "Failed to get user", resp.StatusCode)
		return
	}

	// Decode the response from Hasura
	var response struct {
		Data struct {
			Users []struct {
				ID       string `json:"id"`
				Password string `json:"password"`
			} `json:"users"`
		} `json:"data"`
	}

	if err := json.Unmarshal(respBody, &response); err != nil {
		http.Error(w, "Failed to decode response", http.StatusInternalServerError)
		return
	}

	// Check if user exists
	if len(response.Data.Users) == 0 {
		http.Error(w, "User not found", http.StatusUnauthorized)
		return
	}
	log.Printf("User found: %v", response.Data.Users)

	// Compare the provided password with the stored hashed password
	storedHashedPassword := response.Data.Users[0].Password
	log.Printf("Password entered: %s", input.Password) // Be cautious about logging sensitive information!
	log.Printf("Stored hashed password: %s", storedHashedPassword)

	if !checkPasswordHash(input.Password, storedHashedPassword) {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Generate JWT token
	token, err := generateJWT(response.Data.Users[0].ID)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	// Return the token
	responseJSON := map[string]string{"token": token}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(responseJSON)
}

// hashPassword hashes the password using bcrypt
func hashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

// checkPasswordHash compares a hashed password with its plain text equivalent
func checkPasswordHash(password, hash string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)) == nil
}
