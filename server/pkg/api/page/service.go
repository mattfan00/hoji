package bookmark

import (
	"github.com/go-pg/pg/v10"
	"github.com/mattfan00/hoji/server/pkg/api/page/platform"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
)

type PageInterface interface {
	Create(model.User, createReq) (model.Page, error)
	List(model.User) ([]model.Page, error)
	Delete(model.User, string) error
}

type PageService struct {
	db  *pg.DB
	udb UDB
}

type UDB interface {
	Create(*pg.DB, *model.Page) error
	List(*pg.DB, string) ([]model.Page, error)
	Delete(*pg.DB, string, string) error
}

func New(db *pg.DB) *PageService {
	return &PageService{
		db:  db,
		udb: platform.Postgres{},
	}
}
