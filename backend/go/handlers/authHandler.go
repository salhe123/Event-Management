package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte("your_secret_key") // Change this to a secure random string in production

// User struct represents a user in the system.
type User struct {
	ID        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
}

// SignupInput struct represents the input for the signup action.
type SignupInput struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

// SignupOutput struct represents the output for the signup action.
type SignupOutput struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}

// LoginInput struct represents the input for the login action.
type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// LoginOutput struct represents the output for the login action.
type LoginOutput struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}

// In-memory user store
var users = make(map[string]User)           // Maps email to User struct
var userPasswords = make(map[string]string) // Maps email to hashed password
var userIDCounter = 1

// HashPassword hashes the user's password using bcrypt.
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// CheckPasswordHash checks if the provided password matches the hashed password.
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// CreateToken generates a JWT token.
func CreateToken(user User) (string, error) {
	claims := jwt.MapClaims{
		"id":         user.ID,
		"first_name": user.FirstName,
		"last_name":  user.LastName,
		"email":      user.Email,
		"exp":        time.Now().Add(time.Hour * 72).Unix(), // Token expires in 72 hours
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

// Signup handler
func SignupHandler(w http.ResponseWriter, r *http.Request) {
	var input SignupInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}
	log.Printf("Received signup input: %+v\n", input)
	// Hash password
	hashedPassword, err := HashPassword(input.Password)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusInternalServerError)
		return
	}

	// Create user
	user := User{
		ID:        userIDCounter,
		FirstName: input.FirstName,
		LastName:  input.LastName,
		Email:     input.Email,
	}

	users[input.Email] = user
	userPasswords[input.Email] = hashedPassword // Store the hashed password
	userIDCounter++

	// Create token
	token, err := CreateToken(user)
	if err != nil {
		http.Error(w, "Error generating token", http.StatusInternalServerError)
		return
	}

	output := SignupOutput{
		Token: token,
		User:  user,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(output)
}

// Login handler
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var input LoginInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	// Validate user credentials
	user, exists := users[input.Email]
	if !exists || !CheckPasswordHash(input.Password, userPasswords[input.Email]) {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Create token
	token, err := CreateToken(user)
	if err != nil {
		http.Error(w, "Error generating token", http.StatusInternalServerError)
		return
	}

	output := LoginOutput{
		Token: token,
		User:  user,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(output)
}
