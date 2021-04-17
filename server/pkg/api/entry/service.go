package entry

import (
	"github.com/go-pg/pg/v10"
	"github.com/labstack/echo/v4"
)

type EntryInterface interface {
	View(echo.Context) error
	Create(echo.Context) error
	List(echo.Context) error
	Update(echo.Context) error
	Delete(echo.Context) error
}

type EntryService struct {
	db *pg.DB
}

func New(db *pg.DB) *EntryService {
	return &EntryService{
		db: db,
	}
}
