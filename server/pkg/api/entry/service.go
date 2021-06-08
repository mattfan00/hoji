package entry

import (
	"server/pkg/api/entry/platform"
	"server/pkg/utl/aws"
	"server/pkg/utl/model"

	"github.com/go-pg/pg/v10"
	"github.com/labstack/echo/v4"
)

type EntryInterface interface {
	View(echo.Context) error
	Create(echo.Context) error
	UploadImage(echo.Context) error
	List(echo.Context) error
	Update(echo.Context) error
	Delete(echo.Context) error
}

type EntryService struct {
	db  *pg.DB
	udb UDB
	aws *aws.Service
}

type UDB interface {
	Create(*pg.DB, *model.Entry) error
	View(*pg.DB, string) (model.Entry, error)
	List(*pg.DB, int, int) ([]model.Entry, error)
	FindByUser(*pg.DB, string, string) (model.Entry, error)
	Update(*pg.DB, map[string]interface{}, string) error
	Delete(*pg.DB, model.Entry) error
}

func New(db *pg.DB, aws *aws.Service) *EntryService {
	return &EntryService{
		db:  db,
		udb: platform.Postgres{},
		aws: aws,
	}
}
