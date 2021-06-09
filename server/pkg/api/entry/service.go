package entry

import (
	"mime/multipart"
	"server/pkg/api/entry/platform"
	"server/pkg/utl/aws"
	"server/pkg/utl/model"

	"github.com/go-pg/pg/v10"
)

type EntryInterface interface {
	View(string) (model.Entry, error)
	Create(model.User, createReq) (model.Entry, error)
	UploadImage(*multipart.FileHeader) (string, error)
	List(int) ([]model.Entry, int, error)
	Update(model.User, string, updateReq) error
	Delete(model.User, string) error
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
