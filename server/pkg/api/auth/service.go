package auth

import (
	"github.com/go-pg/pg/v10"
	"github.com/labstack/echo/v4"
)

type AuthInterface interface {
	Register(echo.Context) error
	Login(echo.Context) error
	Check(echo.Context) error
	Current(echo.Context) error
	Logout(echo.Context) error
}

type AuthService struct {
	db *pg.DB
}

func New(db *pg.DB) *AuthService {
	return &AuthService{
		db: db,
	}
}
