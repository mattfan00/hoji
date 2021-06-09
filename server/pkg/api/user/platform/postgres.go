package platform

import (
	"server/pkg/utl/model"
	"strings"

	"github.com/go-pg/pg/v10"
)

type Postgres struct{}

func (postgres Postgres) View(db *pg.DB, username string) (model.User, error) {
	foundUser := model.User{}

	err := db.Model(&foundUser).
		Relation("Entries", func(q *pg.Query) (*pg.Query, error) {
			return q.Order("entry.created_at DESC"), nil
		}).
		Where("lower(username) = ?", strings.ToLower(username)).Select()

	return foundUser, err
}

func (postgres Postgres) CheckUsername(db *pg.DB, username string) (model.User, error) {
	foundUser := model.User{}

	err := db.Model(&foundUser).
		Where("lower(username) = ?", strings.ToLower(username)).
		Select()

	return foundUser, err
}

func (postgres Postgres) Update(db *pg.DB, updatedUser *model.User, username string) error {
	_, err := db.Model(updatedUser).
		Where("lower(username) = ?", username).UpdateNotZero()

	return err
}

func (postgres Postgres) UpdateValues(db *pg.DB, newValues map[string]interface{}, username string) error {
	_, err := db.Model(&newValues).TableExpr("users").
		Where("lower(username) = ?", username).Update()

	return err
}
