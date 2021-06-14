package entry

import (
	"errors"
	"reflect"
	"testing"
	"time"

	"github.com/mattfan00/hoji/server/pkg/utl/mock/aws"
	"github.com/mattfan00/hoji/server/pkg/utl/mock/postgres"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
	"github.com/satori/go.uuid"
	"github.com/stretchr/testify/assert"
)

func TestCreate(t *testing.T) {
	type mockParams struct {
		message  string
		retError error
	}

	currUser := model.User{
		Email:    "test@test.com",
		Name:     "Test",
		Username: "test",
	}

	currUser.Id = uuid.NewV4()

	cases := map[string]struct {
		currUser model.User
		body     createReq
		mock     mockParams
		wantErr  bool
	}{
		"Successfully create entry": {
			currUser: currUser,
			body: createReq{
				Type:        "post",
				Title:       "Test",
				Description: "test description",
				Content:     "test content",
			},
			mock: mockParams{
				message:  "Create entry",
				retError: nil,
			},
			wantErr: false,
		},
	}

	for name, test := range cases {
		t.Run(name, func(t *testing.T) {
			entryMock := postgres.EntryMock{}
			awsMock := aws.AwsMock{}

			e := NewTest(&entryMock, &awsMock)

			entryMock.On("Create", test.mock.message).Return(test.mock.retError)

			newEntry, err := e.Create(test.currUser, test.body)

			assert.Equal(t, test.wantErr, err != nil)
			entryMock.AssertExpectations(t)

			if test.wantErr == false {
				assert.Equal(t, newEntry.Title, test.body.Title)
				assert.Equal(t, newEntry.UserId, test.currUser.Id)
				assert.NotEqual(t, newEntry.Id, uuid.UUID{})
				assert.NotEqual(t, newEntry.CreatedAt, time.Time{})
				assert.NotEqual(t, newEntry.UpdatedAt, time.Time{})
			}
		})
	}
}

func TestList(t *testing.T) {
	type mockParams struct {
		limit      int
		cursor     int
		retEntries []model.Entry
		retError   error
	}

	cases := map[string]struct {
		cursor         int
		mock           mockParams
		wantNextCursor int
		wantErr        bool
	}{
		"Successfully list entries with next cursor": {
			cursor: 0,
			mock: mockParams{
				limit:      20,
				cursor:     0,
				retEntries: make([]model.Entry, 20),
				retError:   nil,
			},
			wantNextCursor: 20,
			wantErr:        false,
		},

		"Successfully list entries without next cursor": {
			cursor: 0,
			mock: mockParams{
				limit:      20,
				cursor:     0,
				retEntries: make([]model.Entry, 10),
				retError:   nil,
			},
			wantNextCursor: 0,
			wantErr:        false,
		},
	}

	for name, test := range cases {
		t.Run(name, func(t *testing.T) {
			entryMock := postgres.EntryMock{}
			awsMock := aws.AwsMock{}

			e := NewTest(&entryMock, &awsMock)

			entryMock.On("List", test.mock.limit, test.mock.cursor).Return(test.mock.retEntries, test.mock.retError)

			_, nextCursor, err := e.List(test.cursor)

			assert.Equal(t, test.wantErr, err != nil)
			assert.Equal(t, test.wantNextCursor, nextCursor)
			entryMock.AssertExpectations(t)
		})
	}
}

func TestUpdate(t *testing.T) {
	type findMockParams struct {
		entryId  string
		userId   string
		retEntry model.Entry
		retError error
	}

	type updateMockParams struct {
		entryId  string
		retError error
	}

	currUser := model.User{
		Email:    "test@test.com",
		Name:     "Test",
		Username: "test",
	}

	currUser.Id = uuid.NewV4()

	entryId := uuid.NewV4()

	cases := map[string]struct {
		currUser   model.User
		id         string
		body       updateReq
		findMock   findMockParams
		updateMock updateMockParams
		wantErr    bool
	}{
		"Successfully update entry": {
			currUser: currUser,
			id:       entryId.String(),
			body: updateReq{
				Title:       "Title",
				Description: "description",
				Content:     "content",
			},
			findMock: findMockParams{
				entryId:  entryId.String(),
				userId:   currUser.Id.String(),
				retEntry: model.Entry{},
				retError: nil,
			},
			updateMock: updateMockParams{
				entryId:  entryId.String(),
				retError: nil,
			},
			wantErr: false,
		},

		"Failed update entry since entry does not belong to user": {
			currUser: currUser,
			id:       entryId.String(),
			body: updateReq{
				Title:       "Title",
				Description: "description",
				Content:     "content",
			},
			findMock: findMockParams{
				entryId:  entryId.String(),
				userId:   currUser.Id.String(),
				retEntry: model.Entry{},
				retError: errors.New("No rows returned"),
			},
			updateMock: updateMockParams{},
			wantErr:    true,
		},
	}

	for name, test := range cases {
		t.Run(name, func(t *testing.T) {
			entryMock := postgres.EntryMock{}
			awsMock := aws.AwsMock{}

			e := NewTest(&entryMock, &awsMock)

			entryMock.On("FindByUser", test.findMock.entryId, test.findMock.userId).Return(test.findMock.retEntry, test.findMock.retError)

			if !reflect.ValueOf(test.updateMock).IsZero() {
				entryMock.On("Update", test.updateMock.entryId).Return(test.updateMock.retError)
			}

			err := e.Update(test.currUser, test.id, test.body)

			assert.Equal(t, test.wantErr, err != nil)
			entryMock.AssertExpectations(t)
		})
	}
}

func TestDelete(t *testing.T) {
	type findMockParams struct {
		entryId  string
		userId   string
		retEntry model.Entry
		retError error
	}

	type deleteMockParams struct {
		message  string
		retError error
	}

	currUser := model.User{
		Email:    "test@test.com",
		Name:     "Test",
		Username: "test",
	}

	currUser.Id = uuid.NewV4()

	entryId := uuid.NewV4()

	cases := map[string]struct {
		currUser   model.User
		id         string
		findMock   findMockParams
		deleteMock deleteMockParams
		wantErr    bool
	}{
		"Successfully delete entry": {
			currUser: currUser,
			id:       entryId.String(),
			findMock: findMockParams{
				entryId:  entryId.String(),
				userId:   currUser.Id.String(),
				retEntry: model.Entry{},
				retError: nil,
			},
			deleteMock: deleteMockParams{
				message:  "Delete entry",
				retError: nil,
			},
			wantErr: false,
		},

		"Failed delete entry since entry does not belong to user": {
			currUser: currUser,
			id:       entryId.String(),
			findMock: findMockParams{
				entryId:  entryId.String(),
				userId:   currUser.Id.String(),
				retEntry: model.Entry{},
				retError: errors.New("No rows returned"),
			},
			deleteMock: deleteMockParams{},
			wantErr:    true,
		},
	}

	for name, test := range cases {
		t.Run(name, func(t *testing.T) {
			entryMock := postgres.EntryMock{}
			awsMock := aws.AwsMock{}

			e := NewTest(&entryMock, &awsMock)

			entryMock.On("FindByUser", test.findMock.entryId, test.findMock.userId).Return(test.findMock.retEntry, test.findMock.retError)

			if !reflect.ValueOf(test.deleteMock).IsZero() {
				entryMock.On("Delete", test.deleteMock.message).Return(test.deleteMock.retError)
			}

			err := e.Delete(test.currUser, test.id)

			assert.Equal(t, test.wantErr, err != nil)
			entryMock.AssertExpectations(t)
		})
	}
}
