package bookmark

import (
	"server/pkg/api/bookmark/platform"
	"server/pkg/utl/model"

	"github.com/go-pg/pg/v10"
	"github.com/labstack/echo/v4"
)

type BookmarkInterface interface {
	Create(echo.Context) error
	List(echo.Context) error
	Delete(echo.Context) error
}

type BookmarkService struct {
	db  *pg.DB
	udb UDB
}

type UDB interface {
	Create(*pg.DB, *model.Bookmark) error
	List(*pg.DB, string) ([]model.Bookmark, error)
	Delete(*pg.DB, string) error
}

func New(db *pg.DB) *BookmarkService {
	return &BookmarkService{
		db:  db,
		udb: platform.Postgres{},
	}
}
