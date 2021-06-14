package postgres

import (
	"time"

	"github.com/go-pg/pg/v10"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
	"github.com/satori/go.uuid"
	"github.com/stretchr/testify/mock"
)

type EntryMock struct {
	mock.Mock
}

func (m *EntryMock) Create(db *pg.DB, newEntry *model.Entry) error {
	args := m.Called("Create entry")

	newEntry.Id = uuid.NewV4()
	newEntry.CreatedAt = time.Now().UTC()
	newEntry.UpdatedAt = time.Now().UTC()

	return args.Error(1)
}

func (m *EntryMock) View(db *pg.DB, id string) (model.Entry, error) {
	args := m.Called(id)

	return args.Get(0).(model.Entry), args.Error(1)
}

func (m *EntryMock) List(db *pg.DB, limit int, cursor int) ([]model.Entry, error) {
	args := m.Called(limit, cursor)

	return args.Get(0).([]model.Entry), args.Error(1)
}

func (m *EntryMock) FindByUser(db *pg.DB, entryId string, userId string) (model.Entry, error) {
	args := m.Called(entryId, userId)

	return args.Get(0).(model.Entry), args.Error(1)
}

func (m *EntryMock) Update(db *pg.DB, newValues map[string]interface{}, id string) error {
	args := m.Called(id)

	return args.Error(0)
}

func (m *EntryMock) Delete(db *pg.DB, entry model.Entry) error {
	args := m.Called(entry.Id.String())

	return args.Error(0)
}
