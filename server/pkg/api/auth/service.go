package auth

import (
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
)

type AuthInterface interface {
	Register(echo.Context) error
	Login(echo.Context) error
	Current(echo.Context) error
	Logout(echo.Context) error
}

type AuthService struct {
	db *mongo.Database
}

func New(db *mongo.Database) *AuthService {
	return &AuthService{
		db: db,
	}
}
