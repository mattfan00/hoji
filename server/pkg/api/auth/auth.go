package auth

import (
	"context"
	"server/pkg/utl/model"
	"time"

	"github.com/labstack/echo/v4"
)

type registerReq struct {
	Email       string `json:"email" bson:"email"`
	Password    string `json:"password" bson:"password"`
	Name        string `json:"name" bson:"name"`
	Username    string `json:"username" bson:"username"`
	Description string `json:"description,omitempty" bson:"description,omitempty"`
	Website     string `json:"website,omitempty" bson:"website,omitempty"`
}

func (a AuthService) Register(c echo.Context) error {
	body := new(registerReq)

	if err := c.Bind(&body); err != nil {
		return err
	}

	newUser := model.User{
		Email:    body.Email,
		Password: body.Password,
		Name:     body.Name,
		Username: body.Username,
		Details: model.UserDetails{
			Description: body.Description,
			Website:     body.Website,
		},
		Created: time.Now(),
	}

	registerResult, _ := a.db.Collection("users").InsertOne(context.TODO(), newUser)

	return c.JSON(200, registerResult.InsertedID)
}
