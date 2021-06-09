package user

import (
	"mime/multipart"
	"server/pkg/api/user/platform"
	"server/pkg/utl/aws"
	"server/pkg/utl/model"

	"github.com/go-pg/pg/v10"
)

type UserInterface interface {
	View(string) (model.User, error)
	Update(model.User, string, updateReq) error
	UpdateAvatar(model.User, string, *multipart.FileHeader) (string, error)
	RemoveAvatar(model.User, string) error
}

type UserService struct {
	db  *pg.DB
	udb UDB
	aws *aws.Service
}

type UDB interface {
	View(*pg.DB, string) (model.User, error)
	CheckUsername(*pg.DB, string) (model.User, error)
	Update(*pg.DB, *model.User, string) error
	UpdateValues(*pg.DB, map[string]interface{}, string) error
}

func New(db *pg.DB, aws *aws.Service) *UserService {
	return &UserService{
		db:  db,
		udb: platform.Postgres{},
		aws: aws,
	}
}
