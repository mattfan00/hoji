package bookmark

import (
	"server/pkg/api/bookmark/platform"
	"server/pkg/utl/model"

	"github.com/go-pg/pg/v10"
)

type BookmarkInterface interface {
	Create(model.User, createReq) (model.Bookmark, error)
	List(model.User) ([]model.Bookmark, error)
	Delete(string) error
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
