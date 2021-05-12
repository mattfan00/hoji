package entry

import (
	"server/pkg/utl/aws"

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
	aws *aws.Service
}

func New(db *pg.DB, aws *aws.Service) *EntryService {
	return &EntryService{
		db:  db,
		aws: aws,
	}
}
