package user

import (
	"server/pkg/utl/errors"
	"server/pkg/utl/jwt"
	"server/pkg/utl/model"
	"strings"
	"time"

	//"github.com/fatih/structs"
	"github.com/go-pg/pg/v10"
	"github.com/jinzhu/copier"
	"github.com/labstack/echo/v4"
)

func (u UserService) View(c echo.Context) error {
	foundUser := new(model.User)

	err := u.db.Model(foundUser).
		Relation("Entries").
		Where("lower(username) = ?", strings.ToLower(c.Param("username"))).Select()

	if err != nil {
		return errors.NotFound()
	}

	return c.JSON(200, foundUser)
}

type updateReq struct {
	Name        string `json:"name" structs:"name" validate:"required"`
	Username    string `json:"username" structs:"username" validate:"required"`
	Description string `json:"description,omitempty" structs:"description"`
	Website     string `json:"website,omitempty" structs:"website"`
}

func (u UserService) Update(c echo.Context) error {
	currUser := c.Get("user").(model.AuthUser)

	// don't let people submit request to change username of someone else
	if currUser.Username != c.Param("username") {
		return errors.Unauthorized()
	}

	body := new(updateReq)

	if err := c.Bind(body); err != nil {
		return err
	}

	if err := c.Validate(body); err != nil {
		return err
	}

	// if the username is being changed, check if it the username is in use already
	if currUser.Username != body.Username {
		foundUser := new(model.User)
		err := u.db.Model(foundUser).Where("lower(username) = ?", strings.ToLower(body.Username)).Select()

		// if found a user with that username
		if err == nil || err != pg.ErrNoRows {
			return errors.BadRequest("Username already in use")
		}
	}

	// update the appropriate user
	updatedUser := new(model.User)
	copier.Copy(updatedUser, &body)

	_, err := u.db.Model(updatedUser).
		Where("lower(username) = ?", currUser.Username).UpdateNotZero()

	if err != nil {
		return err
	}

	// create a new JWT token
	newAuthUser := model.AuthUser{
		Id:       currUser.Id,
		Name:     body.Name,
		Username: body.Username,
		Email:    currUser.Email,
	}

	if err != nil {
		return err
	}

	newJwt, err := jwt.GenerateToken(newAuthUser)

	if err != nil {
		return err
	}

	jwt.CreateCookie(c, "token", newJwt)

	return c.JSON(200, newAuthUser)
}

func (u UserService) UpdateAvatar(c echo.Context) error {
	currUser := c.Get("user").(model.AuthUser)

	// don't let people submit request to change username of someone else
	if currUser.Username != c.Param("username") {
		return errors.Unauthorized()
	}

	form, err := c.MultipartForm()

	if err != nil {
		return err
	}

	file := form.File["file"][0]

	fileLocation, err := u.aws.AddObject(file, "hoji", "/avatar")

	if err != nil {
		return err
	}

	updatedUser := model.User{Avatar: fileLocation}
	_, err = u.db.Model(&updatedUser).
		Where("lower(username) = ?", currUser.Username).UpdateNotZero()

	if err != nil {
		return err
	}

	return c.JSON(200, fileLocation)
}

func (u UserService) RemoveAvatar(c echo.Context) error {
	currUser := c.Get("user").(model.AuthUser)

	// don't let people submit request to change username of someone else
	if currUser.Username != c.Param("username") {
		return errors.Unauthorized()
	}

	newValues := map[string]interface{}{
		"avatar":     nil,
		"updated_at": time.Now().UTC(),
	}
	_, err := u.db.Model(&newValues).TableExpr("users").
		Where("lower(username) = ?", currUser.Username).Update()

	if err != nil {
		return err
	}

	return c.JSON(200, "Succesfully removed avatar")
}
