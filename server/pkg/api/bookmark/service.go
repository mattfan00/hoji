package bookmark

import (
	"github.com/go-pg/pg/v10"
	"github.com/labstack/echo/v4"
)

type BookmarkInterface interface {
	Create(echo.Context) error
	List(echo.Context) error
	Delete(echo.Context) error
}

type BookmarkService struct {
	db *pg.DB
}

func New(db *pg.DB) *BookmarkService {
	return &BookmarkService{
		db: db,
	}
}
