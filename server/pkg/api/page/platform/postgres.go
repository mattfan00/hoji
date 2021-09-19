package platform

import (
	"github.com/go-pg/pg/v10"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
)

type Postgres struct{}

func (postgres Postgres) Create(db *pg.DB, newPage *model.Page) error {
	// update active to be true if the bookmark exists already
	_, err := db.Model(newPage).
		Insert()

	return err
}

func (postgres Postgres) List(db *pg.DB, userId string) ([]model.Page, error) {
	foundPages := []model.Page{}

	err := db.Model(&foundPages).
		Select()

	return foundPages, err
}

func (postgres Postgres) Delete(db *pg.DB, userId string, id string) error {
	return nil
}
