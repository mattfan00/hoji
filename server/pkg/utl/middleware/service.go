package middleware

import (
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/go-pg/pg/v10"
	"github.com/labstack/echo/v4"
)

type MiddlewareInterface interface {
	Auth(echo.HandlerFunc) echo.HandlerFunc
	Pagination(echo.HandlerFunc) echo.HandlerFunc
}

type MiddlewareService struct {
	db  *pg.DB
	jwt JWT
}

type JWT interface {
	ParseAccessToken(string) (*jwt.Token, error)
}

func New(db *pg.DB, jwt JWT) *MiddlewareService {
	return &MiddlewareService{
		db:  db,
		jwt: jwt,
	}
}
