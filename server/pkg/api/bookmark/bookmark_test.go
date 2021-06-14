package bookmark

import (
	"errors"
	"reflect"
	"testing"

	"github.com/mattfan00/hoji/server/pkg/utl/mock/postgres"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
	"github.com/satori/go.uuid"
	"github.com/stretchr/testify/assert"
)

func TestCreate(t *testing.T) {
	type findMockParams struct {
		id       string
		retUser  model.User
		retError error
	}

	type createMockParams struct {
		message  string
		retError error
	}

	currUser := model.User{
		Email:    "test@test.com",
		Name:     "Test",
		Username: "test",
	}

	currUser.Id = uuid.NewV4()

	newBookmarkUserId := uuid.NewV4()

	cases := map[string]struct {
		currUser   model.User
		body       createReq
		findMock   findMockParams
		createMock createMockParams
		wantErr    bool
	}{
		"Successfully create bookmark": {
			currUser: currUser,
			body: createReq{
				BookmarkUserId: newBookmarkUserId,
			},
			findMock: findMockParams{
				id:       newBookmarkUserId.String(),
				retUser:  model.User{},
				retError: nil,
			},
			createMock: createMockParams{
				message:  "Create bookmark",
				retError: nil,
			},
			wantErr: false,
		},

		"Failed create by bookmarking own profile": {
			currUser: currUser,
			body: createReq{
				BookmarkUserId: currUser.Id,
			},
			findMock:   findMockParams{},
			createMock: createMockParams{},
			wantErr:    true,
		},

		"Failed create by bookmarking a non existent user": {
			currUser: currUser,
			body: createReq{
				BookmarkUserId: newBookmarkUserId,
			},
			findMock: findMockParams{
				id:       newBookmarkUserId.String(),
				retUser:  model.User{},
				retError: errors.New("No rows returned"),
			},
			createMock: createMockParams{},
			wantErr:    true,
		},
	}

	for name, test := range cases {
		t.Run(name, func(t *testing.T) {
			bookmarkMock := postgres.BookmarkMock{}
			b := NewTest(&bookmarkMock)

			// if the mock params are not empty, then expect the mocked function to be called
			if !reflect.ValueOf(test.findMock).IsZero() {
				bookmarkMock.On("FindUser", test.findMock.id).Return(test.findMock.retUser, test.findMock.retError)
			}

			if !reflect.ValueOf(test.createMock).IsZero() {
				bookmarkMock.On("Create", test.createMock.message).Return(test.createMock.retError)
			}

			_, err := b.Create(test.currUser, test.body)

			assert.Equal(t, test.wantErr, err != nil)
			bookmarkMock.AssertExpectations(t)
		})
	}
}

func TestList(t *testing.T) {
	type mockParams struct {
		id           string
		retBookmarks []model.Bookmark
		retError     error
	}

	currUser := model.User{
		Email:    "test@test.com",
		Name:     "Test",
		Username: "test",
	}

	currUser.Id = uuid.NewV4()

	cases := map[string]struct {
		currUser model.User
		mock     mockParams
		wantErr  bool
	}{
		"Successfully list bookmarks for current user": {
			currUser: currUser,
			mock: mockParams{
				id:           currUser.Id.String(),
				retBookmarks: []model.Bookmark{},
				retError:     nil,
			},
			wantErr: false,
		},
	}

	for name, test := range cases {
		t.Run(name, func(t *testing.T) {
			bookmarkMock := postgres.BookmarkMock{}
			b := NewTest(&bookmarkMock)

			bookmarkMock.On("List", test.mock.id).Return(test.mock.retBookmarks, test.mock.retError)

			_, err := b.List(test.currUser)

			assert.Equal(t, test.wantErr, err != nil)
			bookmarkMock.AssertExpectations(t)
		})
	}
}

func TestDelete(t *testing.T) {
	type mockParams struct {
		userId   string
		id       string
		retError error
	}

	currUser := model.User{
		Email:    "test@test.com",
		Name:     "Test",
		Username: "test",
	}

	currUser.Id = uuid.NewV4()

	newBookmarkUserId := uuid.NewV4()

	cases := map[string]struct {
		currUser       model.User
		bookmarkUserId string
		mock           mockParams
		wantErr        bool
	}{
		"Successfully delete bookmark for current user": {
			currUser:       currUser,
			bookmarkUserId: newBookmarkUserId.String(),
			mock: mockParams{
				userId:   currUser.Id.String(),
				id:       newBookmarkUserId.String(),
				retError: nil,
			},
			wantErr: false,
		},
	}

	for name, test := range cases {
		t.Run(name, func(t *testing.T) {
			bookmarkMock := postgres.BookmarkMock{}
			b := NewTest(&bookmarkMock)

			bookmarkMock.On("Delete", test.mock.userId, test.mock.id).Return(test.mock.retError)

			err := b.Delete(test.currUser, test.bookmarkUserId)

			assert.Equal(t, test.wantErr, err != nil)
			bookmarkMock.AssertExpectations(t)
		})
	}
}
