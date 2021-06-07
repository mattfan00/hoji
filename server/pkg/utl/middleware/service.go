package middleware

import (
	"github.com/go-pg/pg/v10"
	"github.com/labstack/echo/v4"
)

type MiddlewareInterface interface {
	Auth(echo.HandlerFunc) echo.HandlerFunc
	Pagination(echo.HandlerFunc) echo.HandlerFunc
}

type MiddlewareService struct {
	db *pg.DB
}

func New(db *pg.DB) *MiddlewareService {
	return &MiddlewareService{
		db: db,
	}
}
