package user

import (
	"context"
	"server/pkg/utl/errors"
	"server/pkg/utl/model"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
)

func (u UserService) View(c echo.Context) error {
	var foundUser model.PublicUser

	err := u.db.Collection("users").FindOne(context.TODO(), bson.M{
		"username": c.Param("username"),
	}).Decode(&foundUser)

	if err != nil {
		return errors.NotFound()
	}

	return c.JSON(200, foundUser)
}
