package postgres

import (
	"time"

	"github.com/go-pg/pg/v10"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
	"github.com/satori/go.uuid"
	"github.com/stretchr/testify/mock"
)

type AuthMock struct {
	mock.Mock
}

func (m *AuthMock) CheckEmail(db *pg.DB, email string) (model.User, error) {
	args := m.Called(email)

	return args.Get(0).(model.User), args.Error(1)
}

func (m *AuthMock) CheckUsername(db *pg.DB, username string) (model.User, error) {
	args := m.Called(username)

	return args.Get(0).(model.User), args.Error(1)
}

func (m *AuthMock) Register(db *pg.DB, newUser *model.User) error {
	args := m.Called(newUser.Email)

	newUser.Id = uuid.NewV4()
	newUser.CreatedAt = time.Now().UTC()
	newUser.UpdatedAt = time.Now().UTC()

	return args.Error(0)
}
