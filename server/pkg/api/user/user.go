package user

import (
	"context"
	"log"
	"server/pkg/utl/model"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
)

func (u UserService) View(c echo.Context) error {
	var foundUser model.User

	err := u.db.Collection("users").FindOne(context.TODO(), bson.D{
		{Key: "username", Value: c.Param("username")},
	}).Decode(&foundUser)

	if err != nil {
		log.Fatal(err)
	}

	return c.JSON(200, foundUser)
}
