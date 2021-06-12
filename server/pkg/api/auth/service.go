package auth

import (
	"server/pkg/api/auth/platform"
	"server/pkg/utl/mock/postgres"
	"server/pkg/utl/model"

	"github.com/go-pg/pg/v10"
)

type AuthInterface interface {
	Register(registerReq) (model.User, error)
	Login(loginReq) (model.User, error)
	Check(string) error
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

func NewTest(mock *postgres.UserMock) *AuthService {
	return &AuthService{
		db:  nil,
		udb: mock,
	}
}
