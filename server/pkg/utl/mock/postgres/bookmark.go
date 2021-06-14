package postgres

import (
	"github.com/go-pg/pg/v10"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
	"github.com/stretchr/testify/mock"
)

type BookmarkMock struct {
	mock.Mock
}

func (m *BookmarkMock) Create(db *pg.DB, newBookmark *model.Bookmark) error {
	args := m.Called("Create bookmark")

	return args.Error(0)
}

func (m *BookmarkMock) FindUser(db *pg.DB, id string) (model.User, error) {
	args := m.Called(id)

	return args.Get(0).(model.User), args.Error(1)
}

func (m *BookmarkMock) List(db *pg.DB, userId string) ([]model.Bookmark, error) {
	args := m.Called(userId)

	return args.Get(0).([]model.Bookmark), args.Error(1)
}

func (m *BookmarkMock) Delete(db *pg.DB, userId string, id string) error {
	args := m.Called(userId, id)

	return args.Error(0)
}
