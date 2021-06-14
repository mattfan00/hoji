package bookmark

import (
	"github.com/go-pg/pg/v10"
	"github.com/mattfan00/hoji/server/pkg/api/bookmark/platform"
	"github.com/mattfan00/hoji/server/pkg/utl/mock/postgres"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
)

type BookmarkInterface interface {
	Create(model.User, createReq) (model.Bookmark, error)
	List(model.User) ([]model.Bookmark, error)
	Delete(model.User, string) error
}

type BookmarkService struct {
	db  *pg.DB
	udb UDB
}

type UDB interface {
	Create(*pg.DB, *model.Bookmark) error
	FindUser(*pg.DB, string) (model.User, error)
	List(*pg.DB, string) ([]model.Bookmark, error)
	Delete(*pg.DB, string, string) error
}

func New(db *pg.DB) *BookmarkService {
	return &BookmarkService{
		db:  db,
		udb: platform.Postgres{},
	}
}

func NewTest(mock *postgres.BookmarkMock) *BookmarkService {
	return &BookmarkService{
		db:  nil,
		udb: mock,
	}
}
