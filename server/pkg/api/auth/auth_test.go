package auth

import (
	"errors"
	"reflect"
	"testing"
	"time"

	"github.com/mattfan00/hoji/server/pkg/utl/mock/jwt"
	"github.com/mattfan00/hoji/server/pkg/utl/mock/postgres"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
	"github.com/satori/go.uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"golang.org/x/crypto/bcrypt"
)

func TestRegister(t *testing.T) {
	type registerMockParams struct {
		email    string
		retError error
	}

	type jwtMockParams struct {
		email        string
		retAuthToken model.AuthToken
		retError     error
	}

	type updateMockParams struct {
		email    string
		retError error
	}

	cases := map[string]struct {
		body         registerReq
		registerMock registerMockParams
		jwtMock      jwtMockParams
		updateMock   updateMockParams
		wantErr      bool
	}{
		"Successfully register user": {
			body: registerReq{
				Email:    "test@test.com",
				Password: "password",
				Name:     "Test",
				Username: "test",
			},
			registerMock: registerMockParams{
				email:    "test@test.com",
				retError: nil,
			},
			jwtMock: jwtMockParams{
				email:        "test@test.com",
				retAuthToken: model.AuthToken{},
				retError:     nil,
			},
			updateMock: updateMockParams{
				email:    "test@test.com",
				retError: nil,
			},
			wantErr: false,
		},

		"Failed register user with unavailable username": {
			body: registerReq{
				Email:    "test@test.com",
				Password: "password",
				Name:     "Test",
				Username: "settings",
			},
			registerMock: registerMockParams{},
			wantErr:      true,
		},
	}

	for name, test := range cases {
		t.Run(name, func(t *testing.T) {
			authMock := postgres.AuthMock{}
			jwtMock := jwt.JwtMock{}
			a := NewTest(&authMock, &jwtMock)

			if !reflect.ValueOf(test.registerMock).IsZero() {
				authMock.On("Register", test.registerMock.email).Return(test.registerMock.retError)
			}

			if !reflect.ValueOf(test.jwtMock).IsZero() {
				jwtMock.On("GenerateTokens", test.jwtMock.email).
					Return(test.jwtMock.retAuthToken, test.jwtMock.retError)
			}

			if !reflect.ValueOf(test.updateMock).IsZero() {
				authMock.On("Update", test.updateMock.email).Return(test.updateMock.retError)
			}

			newUser, _, err := a.Register(test.body)

			assert.Equal(t, test.wantErr, err != nil)
			authMock.AssertExpectations(t)
			jwtMock.AssertExpectations(t)

			if test.wantErr == false {
				assert.Equal(t, newUser.Email, test.body.Email)
				assert.NotEqual(t, newUser.Password, test.body.Password)
				assert.NotEqual(t, newUser.Id, uuid.UUID{})
				assert.NotEqual(t, newUser.CreatedAt, time.Time{})
				assert.NotEqual(t, newUser.UpdatedAt, time.Time{})
			}
		})
	}
}

func TestLogin(t *testing.T) {
	type checkMockParams struct {
		email    string
		retUser  model.User
		retError error
	}

	type jwtMockParams struct {
		email        string
		retAuthToken model.AuthToken
		retError     error
	}

	type updateMockParams struct {
		email    string
		retError error
	}

	hashed, _ := bcrypt.GenerateFromPassword([]byte("password"), bcrypt.DefaultCost)

	expectedUser := model.User{
		Email:    "test@test.com",
		Password: string(hashed),
		Name:     "Test",
		Username: "test",
	}

	cases := map[string]struct {
		body       loginReq
		checkMock  checkMockParams
		jwtMock    jwtMockParams
		updateMock updateMockParams
		wantErr    bool
		wantUser   model.User
	}{
		"Successfully login": {
			body: loginReq{
				Email:    "test@test.com",
				Password: "password",
			},
			checkMock: checkMockParams{
				email:    "test@test.com",
				retUser:  expectedUser,
				retError: nil,
			},
			jwtMock: jwtMockParams{
				email:        "test@test.com",
				retAuthToken: model.AuthToken{},
				retError:     nil,
			},
			updateMock: updateMockParams{
				email:    "test@test.com",
				retError: nil,
			},
			wantErr:  false,
			wantUser: expectedUser,
		},

		"Failed login with incorrect username": {
			body: loginReq{
				Email:    "fail@test.com",
				Password: "password",
			},
			checkMock: checkMockParams{
				email:    mock.Anything,
				retUser:  model.User{},
				retError: errors.New("User not found"),
			},
			jwtMock:    jwtMockParams{},
			updateMock: updateMockParams{},
			wantErr:    true,
			wantUser:   model.User{},
		},

		"Failed login with incorrect password": {
			body: loginReq{
				Email:    "test@test.com",
				Password: "hello",
			},
			checkMock: checkMockParams{
				email:    "test@test.com",
				retUser:  expectedUser,
				retError: nil,
			},
			jwtMock:    jwtMockParams{},
			updateMock: updateMockParams{},
			wantErr:    true,
			wantUser:   model.User{},
		},
	}

	for name, test := range cases {
		t.Run(name, func(t *testing.T) {
			authMock := postgres.AuthMock{}
			jwtMock := jwt.JwtMock{}
			a := NewTest(&authMock, &jwtMock)

			authMock.On("CheckEmail", test.checkMock.email).
				Return(test.checkMock.retUser, test.checkMock.retError)

			if !reflect.ValueOf(test.jwtMock).IsZero() {
				jwtMock.On("GenerateTokens", test.jwtMock.email).
					Return(test.jwtMock.retAuthToken, test.jwtMock.retError)
			}

			if !reflect.ValueOf(test.updateMock).IsZero() {
				authMock.On("Update", test.updateMock.email).Return(test.updateMock.retError)
			}

			foundUser, _, err := a.Login(test.body)

			assert.Equal(t, test.wantErr, err != nil)
			authMock.AssertExpectations(t)
			jwtMock.AssertExpectations(t)

			if test.wantErr == false {
				assert.Equal(t, test.wantUser, foundUser)
			}
		})
	}
}

func TestCheck(t *testing.T) {
	type mockParams struct {
		email    string
		retUser  model.User
		retError error
	}

	hashed, _ := bcrypt.GenerateFromPassword([]byte("password"), bcrypt.DefaultCost)

	expectedUser := model.User{
		Email:    "test@test.com",
		Password: string(hashed),
		Name:     "Test",
		Username: "test",
	}

	cases := map[string]struct {
		email    string
		mock     mockParams
		wantErr  bool
		wantUser model.User
	}{
		"Successfully check with no email found": {
			email: "test@test.com",
			mock: mockParams{
				email:    mock.Anything,
				retUser:  model.User{},
				retError: errors.New("User not found"),
			},
			wantErr: false,
		},

		"Failed check with email found": {
			email: "fail@test.com",
			mock: mockParams{
				email:    "fail@test.com",
				retUser:  expectedUser,
				retError: nil,
			},
			wantErr: true,
		},
	}

	for name, test := range cases {
		t.Run(name, func(t *testing.T) {
			authMock := postgres.AuthMock{}
			jwtMock := jwt.JwtMock{}
			a := NewTest(&authMock, &jwtMock)

			authMock.On("CheckEmail", test.mock.email).Return(test.mock.retUser, test.mock.retError)

			err := a.Check(test.email)

			assert.Equal(t, test.wantErr, err != nil)
			authMock.AssertExpectations(t)
		})
	}
}
