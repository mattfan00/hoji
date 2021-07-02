package auth

import (
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/go-pg/pg/v10"
	"github.com/mattfan00/hoji/server/pkg/api/auth/platform"
	"github.com/mattfan00/hoji/server/pkg/utl/mock/postgres"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
)

type AuthInterface interface {
	Register(registerReq) (model.User, model.AuthToken, error)
	Login(loginReq) (model.User, model.AuthToken, error)
	Check(string) error
	RefreshToken(string) (model.AuthToken, error)
}

type AuthService struct {
	db  *pg.DB
	udb UDB
	jwt JWT
}

type UDB interface {
	View(*pg.DB, string) (model.User, error)
	Update(*pg.DB, *model.User) error
	CheckEmail(*pg.DB, string) (model.User, error)
	CheckUsername(*pg.DB, string) (model.User, error)
	Register(*pg.DB, *model.User) error
}

type JWT interface {
	ParseRefreshToken(string) (*jwt.Token, error)
	GenerateTokens(model.User) (model.AuthToken, error)
}

func New(db *pg.DB, jwt JWT) *AuthService {
	return &AuthService{
		db:  db,
		udb: platform.Postgres{},
		jwt: jwt,
	}
}

func NewTest(pgMock *postgres.AuthMock) *AuthService {
	return &AuthService{
		db:  nil,
		udb: pgMock,
	}
}
