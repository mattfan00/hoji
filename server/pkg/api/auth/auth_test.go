package auth

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRegister(t *testing.T) {
	a := NewMock()

	newUser, err := a.Register(registerReq{
		Email:    "test@test.com",
		Password: "password",
		Name:     "Test",
		Username: "test",
	})

	assert.Nil(t, err)
	assert.Equal(t, newUser.Email, "test@test.com")
}
