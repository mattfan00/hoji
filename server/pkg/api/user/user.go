package user

import (
	"mime/multipart"
	"time"

	"github.com/go-pg/pg/v10"
	"github.com/jinzhu/copier"
	"github.com/mattfan00/hoji/server/pkg/utl/errors"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
)

func (u UserService) View(username string) (model.User, error) {
	foundUser, err := u.udb.View(u.db, username)

	return foundUser, err

}

func (u UserService) Update(currUser model.User, username string, body updateReq) error {
	// don't let people submit request to change details of someone else
	if currUser.Username != username {
		return errors.Unauthorized()
	}

	// if the username is being changed, check if the username is in use already
	if currUser.Username != body.Username {
		_, err := u.udb.CheckUsername(u.db, body.Username)

		// if found a user with that username
		if err == nil || err != pg.ErrNoRows {
			return errors.BadRequest("Username already in use")
		}
	}

	// update the appropriate user
	updatedUser := model.User{}
	copier.Copy(&updatedUser, &body)

	err := u.udb.Update(u.db, &updatedUser, currUser.Username)

	return err
}

func (u UserService) UpdateAvatar(currUser model.User, username string, file *multipart.FileHeader) (string, error) {
	// don't let people submit request to change avatar of someone else
	if currUser.Username != username {
		return "", errors.Unauthorized()
	}

	fileLocation, err := u.aws.AddObject(file, "hoji", "/avatar")

	if err != nil {
		return "", err
	}

	updatedUser := model.User{Avatar: fileLocation}

	err = u.udb.Update(u.db, &updatedUser, currUser.Username)

	return fileLocation, err
}

func (u UserService) RemoveAvatar(currUser model.User, username string) error {

	// don't let people submit request to change avatar of someone else
	if currUser.Username != username {
		return errors.Unauthorized()
	}

	newValues := map[string]interface{}{
		"avatar":     nil,
		"updated_at": time.Now().UTC(),
	}

	err := u.udb.UpdateValues(u.db, newValues, currUser.Username)

	return err
}
