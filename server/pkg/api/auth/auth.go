package auth

import (
	"context"
	"log"
	"server/pkg/utl/jwt"
	"server/pkg/utl/model"
	"time"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

	newJwt, _ := jwt.GenerateToken(model.AuthUser{
		Id:       registerResult.InsertedID.(primitive.ObjectID),
		Name:     newUser.Name,
		Username: newUser.Username,
		Email:    newUser.Email,
	})

	return c.JSON(200, newJwt)
}

type loginReq struct {
	Email    string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
}

func (a AuthService) Login(c echo.Context) error {
	body := new(loginReq)

	if err := c.Bind(&body); err != nil {
		return err
	}

	var foundUser model.AuthUser

	err := a.db.Collection("users").FindOne(context.TODO(), bson.M{
		"email": body.Email,
	}).Decode(&foundUser)

	if err != nil {
		log.Fatal(err)
	}

	newJwt, _ := jwt.GenerateToken(foundUser)

	return c.JSON(200, newJwt)
}

func (a AuthService) Current(c echo.Context) error {
	return c.JSON(200, c.Get("user"))
}
