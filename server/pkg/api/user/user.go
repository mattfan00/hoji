package user

import (
	"server/pkg/utl/errors"
	"server/pkg/utl/jwt"
	"server/pkg/utl/model"
	"strings"

	"github.com/fatih/structs"
	"github.com/go-pg/pg/v10"
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
		err := u.db.Model((*model.User)(nil)).Where("lower(username) = ?", strings.ToLower(body.Username)).Select()

		// if found a user with that username
		if err == nil || err != pg.ErrNoRows {
			return errors.BadRequest("Username already in use")
		}
	}

	// update the appropriate user
	newValues := structs.Map(body)
	_, err := u.db.Model(&newValues).TableExpr("users").Where("lower(username) = ?", currUser.Username).Update()

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
