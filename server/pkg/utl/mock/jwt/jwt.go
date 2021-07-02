package jwt

import (
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
	"github.com/stretchr/testify/mock"
)

type JwtMock struct {
	mock.Mock
}

func (m *JwtMock) ParseAccessToken(token string) (*jwt.Token, error) {
	args := m.Called(token)

	return args.Get(0).(*jwt.Token), args.Error(1)
}

func (m *JwtMock) ParseRefreshToken(token string) (*jwt.Token, error) {
	args := m.Called(token)

	return args.Get(0).(*jwt.Token), args.Error(1)
}

func (m *JwtMock) GenerateTokens(user model.User) (model.AuthToken, error) {
	args := m.Called(user.Email)

	return args.Get(0).(model.AuthToken), args.Error(1)
}
