package auth

import (
	"server/pkg/utl/mock/postgres"
	"testing"
	"time"

	"github.com/satori/go.uuid"
	"github.com/stretchr/testify/assert"
)

func TestRegister(t *testing.T) {
	userMock := postgres.UserMock{}
	a := NewTest(&userMock)

	newReq := registerReq{
		Email:    "success1@test.com",
		Password: "password",
		Name:     "Test",
		Username: "test",
	}

	userMock.On("Register", newReq.Email).Return(nil)

	newUser, err := a.Register(newReq)

	if assert.Nil(t, err) {
		assert.Equal(t, newUser.Email, newReq.Email)
		assert.NotEqual(t, newUser.Password, newReq.Password)
		assert.NotEqual(t, newUser.Id, uuid.UUID{})
		assert.NotEqual(t, newUser.CreatedAt, time.Time{})
		assert.NotEqual(t, newUser.UpdatedAt, time.Time{})
	}
}
