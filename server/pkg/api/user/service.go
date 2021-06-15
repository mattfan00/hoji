package user

import (
	"mime/multipart"

	"github.com/go-pg/pg/v10"
	"github.com/mattfan00/hoji/server/pkg/api/user/platform"
	"github.com/mattfan00/hoji/server/pkg/utl/aws"
	awsMock "github.com/mattfan00/hoji/server/pkg/utl/mock/aws"
	"github.com/mattfan00/hoji/server/pkg/utl/mock/postgres"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
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
	aws aws.Interface
}

type UDB interface {
	View(*pg.DB, string) (model.User, error)
	CheckUsername(*pg.DB, string) (model.User, error)
	Update(*pg.DB, *model.User, string) error
	UpdateValues(*pg.DB, map[string]interface{}, string) error
}

func New(db *pg.DB, aws aws.Interface) *UserService {
	return &UserService{
		db:  db,
		udb: platform.Postgres{},
		aws: aws,
	}
}

func NewTest(mockdb *postgres.UserMock, mockaws *awsMock.AwsMock) *UserService {
	return &UserService{
		db:  nil,
		udb: mockdb,
		aws: mockaws,
	}
}
