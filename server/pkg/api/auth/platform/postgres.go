package platform

import (
	"server/pkg/utl/errors"
	"server/pkg/utl/model"
	"strings"

	"github.com/go-pg/pg/v10"
)

type Postgres struct{}

func (postgres Postgres) CheckEmail(db *pg.DB, email string) (model.User, error) {
	foundUser := model.User{}

	err := db.Model(&foundUser).
		Where("lower(email) = ?", strings.ToLower(email)).
		Select()

	return foundUser, err
}

func (postgres Postgres) CheckUsername(db *pg.DB, username string) (model.User, error) {
	foundUser := model.User{}

	err := db.Model(&foundUser).
		Where("lower(username) = ?", strings.ToLower(username)).
		Select()

	return foundUser, err
}

func (postgres Postgres) Register(db *pg.DB, newUser *model.User) error {
	_, err := postgres.CheckEmail(db, newUser.Email)

	if err == nil || err != pg.ErrNoRows {
		return errors.BadRequest("Email already in use")
	}

	_, err = postgres.CheckUsername(db, newUser.Username)

	if err == nil || err != pg.ErrNoRows {
		return errors.BadRequest("Username already in use")
	}

	_, err = db.Model(newUser).Insert()

	return err
}
