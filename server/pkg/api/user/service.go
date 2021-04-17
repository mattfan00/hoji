package user

import (
	"server/pkg/utl/aws"

	"github.com/go-pg/pg/v10"
	"github.com/labstack/echo/v4"
)

type UserInterface interface {
	View(echo.Context) error
	Update(echo.Context) error
	UpdateAvatar(echo.Context) error
}

type UserService struct {
	db  *pg.DB
	aws *aws.Service
}

func New(db *pg.DB, aws *aws.Service) *UserService {
	return &UserService{
		db:  db,
		aws: aws,
	}
}
