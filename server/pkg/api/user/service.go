package user

import (
	"github.com/go-pg/pg/v10"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserInterface interface {
	View(echo.Context) error
	Update(echo.Context) error
}

type UserService struct {
	db *mongo.Database
	pg *pg.DB
}

func New(db *mongo.Database, pg *pg.DB) *UserService {
	return &UserService{
		db: db,
		pg: pg,
	}
}
