package main

import (
	"net/http"
	"your_project_path/handlers"

	"github.com/go-chi/chi"
)

func main() {
	r := chi.NewRouter()

	r.Post("/signup", handlers.SignUp)
	r.Post("/login", handlers.Login)

	http.ListenAndServe(":8080", r)
}
