package user

import (
	"server/pkg/api/user/platform"
	"server/pkg/utl/aws"
	"server/pkg/utl/model"

	"github.com/go-pg/pg/v10"
	"github.com/labstack/echo/v4"
)

type UserInterface interface {
	View(echo.Context) error
	Update(echo.Context) error
	UpdateAvatar(echo.Context) error
	RemoveAvatar(echo.Context) error
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
