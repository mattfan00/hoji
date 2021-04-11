package user

import (
	"context"
	"server/pkg/utl/errors"
	"server/pkg/utl/jwt"
	"server/pkg/utl/model"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
)

func (u UserService) View(c echo.Context) error {
	var foundUser model.User

	err := u.db.Collection("users").FindOne(context.TODO(), bson.M{
		"username": c.Param("username"),
	}).Decode(&foundUser)

	if err != nil {
		return errors.NotFound()
	}

	// populate the entries
	entriesCursor, err := u.db.Collection("entries").Find(context.TODO(), bson.M{
		"_id": bson.M{"$in": foundUser.Entries},
	})

	var entries []model.Entry
	if err = entriesCursor.All(context.TODO(), &entries); err != nil {
		return err
	}

	foundUser.Entries = entries

	return c.JSON(200, foundUser)
}

type updateReq struct {
	Name        string `json:"name" validate:"required"`
	Username    string `json:"username" validate:"required"`
	Description string `json:"description,omitempty"`
	Website     string `json:"website,omitempty"`
}

func (u UserService) Update(c echo.Context) error {
	currUser := c.Get("user").(model.AuthUser)

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

	var foundUser model.AuthUser

	// if the username is being changed, check if it the username is in use already
	if currUser.Username != body.Username {
		err := u.db.Collection("users").FindOne(context.TODO(), bson.M{
			"username": body.Username,
		}).Decode(&foundUser)

		// if found a user with that username
		if err == nil {
			return errors.BadRequest("Username already in use")
		}
	}

	_, err := u.db.Collection("users").UpdateOne(
		context.TODO(),
		bson.M{"username": c.Param("username")},
		bson.M{
			"$set": bson.M{
				"name":                body.Name,
				"username":            body.Username,
				"details.description": body.Description,
				"details.website":     body.Website,
			},
		},
	)

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
