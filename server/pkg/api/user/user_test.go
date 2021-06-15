package user

import (
	"reflect"
	"testing"

	"github.com/go-pg/pg/v10"
	"github.com/mattfan00/hoji/server/pkg/utl/mock/aws"
	"github.com/mattfan00/hoji/server/pkg/utl/mock/postgres"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
	"github.com/satori/go.uuid"
	"github.com/stretchr/testify/assert"
)

func TestView(t *testing.T) {
	type mockParams struct {
		username string
		retUser  model.User
		retError error
	}

	cases := map[string]struct {
		username string
		mock     mockParams
		wantErr  bool
	}{
		"Successfully view user": {
			username: "test",
			mock: mockParams{
				username: "test",
				retUser:  model.User{},
				retError: nil,
			},
			wantErr: false,
		},
	}

	for name, test := range cases {
		t.Run(name, func(t *testing.T) {
			userMock := postgres.UserMock{}
			awsMock := aws.AwsMock{}

			u := NewTest(&userMock, &awsMock)

			userMock.On("View", test.mock.username).Return(test.mock.retUser, test.mock.retError)

			_, err := u.View(test.username)

			assert.Equal(t, test.wantErr, err != nil)
			userMock.AssertExpectations(t)
		})
	}
}

func TestUpdate(t *testing.T) {
	type checkMockParams struct {
		username string
		retUser  model.User
		retError error
	}

	type updateMockParams struct {
		username string
		retError error
	}

	currUser := model.User{
		Email:    "test@test.com",
		Name:     "Test",
		Username: "test",
	}

	currUser.Id = uuid.NewV4()

	cases := map[string]struct {
		currUser   model.User
		username   string
		body       updateReq
		checkMock  checkMockParams
		updateMock updateMockParams
		wantErr    bool
	}{
		"Successfully update user without changing username": {
			currUser: currUser,
			username: currUser.Username,
			body: updateReq{
				Name:     "Test",
				Username: "test",
			},
			checkMock: checkMockParams{},
			updateMock: updateMockParams{
				username: currUser.Username,
				retError: nil,
			},
			wantErr: false,
		},

		"Successfully update user with changing username": {
			currUser: currUser,
			username: currUser.Username,
			body: updateReq{
				Name:     "Test",
				Username: "new",
			},
			checkMock: checkMockParams{
				username: "new",
				retUser:  model.User{},
				retError: pg.ErrNoRows,
			},
			updateMock: updateMockParams{
				username: currUser.Username,
				retError: nil,
			},
			wantErr: false,
		},

		"Failed update user with changing username already in use": {
			currUser: currUser,
			username: currUser.Username,
			body: updateReq{
				Name:     "Test",
				Username: "new",
			},
			checkMock: checkMockParams{
				username: "new",
				retUser:  model.User{},
				retError: nil,
			},
			updateMock: updateMockParams{},
			wantErr:    true,
		},

		"Failed update user with updating details of someone else": {
			currUser: currUser,
			username: "new",
			body: updateReq{
				Name:     "Test",
				Username: "test",
			},
			checkMock:  checkMockParams{},
			updateMock: updateMockParams{},
			wantErr:    true,
		},
	}

	for name, test := range cases {
		t.Run(name, func(t *testing.T) {
			userMock := postgres.UserMock{}
			awsMock := aws.AwsMock{}

			u := NewTest(&userMock, &awsMock)

			if !reflect.ValueOf(test.checkMock).IsZero() {
				userMock.On("CheckUsername", test.checkMock.username).Return(test.checkMock.retUser, test.checkMock.retError)
			}

			if !reflect.ValueOf(test.updateMock).IsZero() {
				userMock.On("Update", test.updateMock.username).Return(test.updateMock.retError)
			}

			err := u.Update(test.currUser, test.username, test.body)

			assert.Equal(t, test.wantErr, err != nil)
			userMock.AssertExpectations(t)
		})
	}
}
