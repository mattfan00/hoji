package user

import (
	"github.com/go-pg/pg/v10"
	"github.com/labstack/echo/v4"
)

type UserInterface interface {
	View(echo.Context) error
	Update(echo.Context) error
}

type UserService struct {
	db *pg.DB
}

func New(db *pg.DB) *UserService {
	return &UserService{
		db: db,
	}
}
