package auth

import (
	"github.com/go-pg/pg/v10"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
)

type AuthInterface interface {
	Register(echo.Context) error
	Login(echo.Context) error
	Check(echo.Context) error
	Current(echo.Context) error
	Logout(echo.Context) error
}

type AuthService struct {
	db *mongo.Database
	pg *pg.DB
}

func New(db *mongo.Database, pg *pg.DB) *AuthService {
	return &AuthService{
		db: db,
		pg: pg,
	}
}
