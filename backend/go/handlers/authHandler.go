package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

// User struct for your PostgreSQL users table
type User struct {
	ID        string `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

// SignUp handles user registration
func SignUp(w http.ResponseWriter, r *http.Request) {
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	user.Password = string(hashedPassword)

	// Prepare the Hasura GraphQL mutation
	mutation := map[string]interface{}{
		"query": `mutation($first_name: String!, $last_name: String!, $email: String!, $password: String!) {
			insert_users_one(object: {first_name: $first_name, last_name: $last_name, email: $email, password: $password}) {
				id
			}
		}`,
		"variables": map[string]interface{}{
			"first_name": user.FirstName,
			"last_name":  user.LastName,
			"email":      user.Email,
			"password":   user.Password,
		},
	}

	// Convert mutation to JSON
	mutationJSON, err := json.Marshal(mutation)
	if err != nil {
		http.Error(w, "Error encoding mutation", http.StatusInternalServerError)
		return
	}

	// Send mutation to Hasura
	req, err := http.NewRequest("POST", "http://localhost:8080/v1/graphql", bytes.NewBuffer(mutationJSON))
	if err != nil {
		http.Error(w, "Error creating request", http.StatusInternalServerError)
		return
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("x-hasura-admin-secret", "your_admin_secret") // Set your Hasura admin secret here

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil || resp.StatusCode != http.StatusOK {
		http.Error(w, "Error from Hasura", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	json.NewEncoder(w).Encode(map[string]string{"message": "User created successfully!"})
}

// AuthResponse struct for the login response
type AuthResponse struct {
	Token string `json:"token"`
}

// Login handles user authentication
func Login(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Prepare the Hasura GraphQL query
	query := map[string]interface{}{
		"query": `query($email: String!) {
			users(where: {email: {_eq: $email}}) {
				id
				password
			}
		}`,
		"variables": map[string]interface{}{
			"email": input.Email,
		},
	}

	// Convert query to JSON
	queryJSON, err := json.Marshal(query)
	if err != nil {
		http.Error(w, "Error encoding query", http.StatusInternalServerError)
		return
	}

	// Send query to Hasura
	req, err := http.NewRequest("POST", "http://localhost:8080/v1/graphql", bytes.NewBuffer(queryJSON))
	if err != nil {
		http.Error(w, "Error creating request", http.StatusInternalServerError)
		return
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("x-hasura-admin-secret", "your_admin_secret") // Set your Hasura admin secret here

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil || resp.StatusCode != http.StatusOK {
		http.Error(w, "Error from Hasura", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	var hasuraResponse struct {
		Data struct {
			Users []User `json:"users"`
		} `json:"data"`
	}
	err = json.NewDecoder(resp.Body).Decode(&hasuraResponse)
	if err != nil || len(hasuraResponse.Data.Users) == 0 {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	user := hasuraResponse.Data.Users[0]

	// Validate password
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password))
	if err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Generate JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  user.ID,
		"exp": time.Now().Add(time.Hour * 72).Unix(),
	})

	tokenString, err := token.SignedString([]byte("your_secret_key")) // Use a strong secret key
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(AuthResponse{Token: tokenString})
}
