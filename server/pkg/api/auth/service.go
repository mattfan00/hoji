package auth

import (
	"server/pkg/api/auth/platform"
	"server/pkg/utl/model"

	"github.com/go-pg/pg/v10"
	"github.com/labstack/echo/v4"
)

type AuthInterface interface {
	Register(echo.Context) error
	Login(echo.Context) error
	Check(echo.Context) error
	Current(echo.Context) error
	Logout(echo.Context) error
}

type AuthService struct {
	db  *pg.DB
	udb UDB
}

type UDB interface {
	CheckEmail(*pg.DB, string) (model.User, error)
	CheckUsername(*pg.DB, string) (model.User, error)
	Register(*pg.DB, *model.User) error
}

func New(db *pg.DB) *AuthService {
	return &AuthService{
		db:  db,
		udb: platform.Postgres{},
	}
}
