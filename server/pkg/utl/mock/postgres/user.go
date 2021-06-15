package postgres

import (
	"github.com/go-pg/pg/v10"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
	"github.com/stretchr/testify/mock"
)

type UserMock struct {
	mock.Mock
}

func (m *UserMock) View(db *pg.DB, username string) (model.User, error) {
	args := m.Called(username)

	return args.Get(0).(model.User), args.Error(1)
}

func (m *UserMock) CheckUsername(db *pg.DB, username string) (model.User, error) {
	args := m.Called(username)

	return args.Get(0).(model.User), args.Error(1)
}

func (m *UserMock) Update(db *pg.DB, updatedUser *model.User, username string) error {
	args := m.Called(username)

	return args.Error(0)
}

func (m *UserMock) UpdateValues(db *pg.DB, newValues map[string]interface{}, username string) error {
	args := m.Called(username)

	return args.Error(0)
}
