package user

import (
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserInterface interface {
	View(echo.Context) error
	Update(echo.Context) error
}

type UserService struct {
	db *mongo.Database
}

func New(db *mongo.Database) *UserService {
	return &UserService{
		db: db,
	}
}
