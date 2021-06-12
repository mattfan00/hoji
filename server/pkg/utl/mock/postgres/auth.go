package postgres

import (
	"fmt"
	"server/pkg/utl/model"
	"time"

	"github.com/go-pg/pg/v10"
	"github.com/satori/go.uuid"
	"github.com/stretchr/testify/mock"
)

type UserMock struct {
	mock.Mock
}

func (m *UserMock) CheckEmail(db *pg.DB, email string) (model.User, error) {
	args := m.Called(email)

	fmt.Println(args.String(0))

	user := model.User{
		Email:    "test@test.com",
		Name:     "Test",
		Username: "test",
	}

	return user, nil
}

func (m *UserMock) CheckUsername(db *pg.DB, username string) (model.User, error) {
	args := m.Called(username)

	fmt.Println(args.String(0))

	user := model.User{
		Email:    "test@test.com",
		Name:     "Test",
		Username: "test",
	}

	return user, nil
}

func (m *UserMock) Register(db *pg.DB, newUser *model.User) error {
	args := m.Called(newUser.Email)

	newUser.Id = uuid.NewV4()
	newUser.CreatedAt = time.Now().UTC()
	newUser.UpdatedAt = time.Now().UTC()

	return args.Error(0)
}
