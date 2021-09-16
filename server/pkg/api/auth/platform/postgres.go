package platform

import (
	"fmt"
	"strings"

	"github.com/go-pg/pg/v10"
	"github.com/mattfan00/hoji/server/pkg/utl/errors"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
)

type Postgres struct{}

func (postgres Postgres) View(db *pg.DB, id string) (model.User, error) {
	foundUser := model.User{}

	err := db.Model(&foundUser).
		Where("id = ?", id).
		Select()

	return foundUser, err
}

func (postgres Postgres) Update(db *pg.DB, updatedUser *model.User) error {
	_, err := db.Model(updatedUser).
		Where("id = ?id").
		Update()

	return err
}

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
		fmt.Println(err)
		return errors.BadRequest("Email already in use")
	}

	_, err = postgres.CheckUsername(db, newUser.Username)

	if err == nil || err != pg.ErrNoRows {
		return errors.BadRequest("Username already in use")
	}

	_, err = db.Model(newUser).Insert()

	return err
}
