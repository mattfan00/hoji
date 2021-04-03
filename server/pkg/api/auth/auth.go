package auth

import (
	"context"
	"server/pkg/utl/errors"
	"server/pkg/utl/jwt"
	"server/pkg/utl/model"
	"time"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
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

	hashed, _ := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
	body.Password = string(hashed)

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

	registerResult, err := a.db.Collection("users").InsertOne(context.TODO(), newUser)

	if err != nil {
		return err
	}

	newJwt, err := jwt.GenerateToken(model.AuthUser{
		Id:       registerResult.InsertedID.(primitive.ObjectID),
		Name:     newUser.Name,
		Username: newUser.Username,
		Email:    newUser.Email,
	})

	if err != nil {
		return err
	}

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

	var foundUser model.User

	err := a.db.Collection("users").FindOne(context.TODO(), bson.M{
		"email": body.Email,
	}).Decode(&foundUser)

	// couldn't find user
	if err != nil {
		return errors.Unauthorized("Invalid credentials")
	}

	// check for password
	err = bcrypt.CompareHashAndPassword([]byte(foundUser.Password), []byte(body.Password))

	if err != nil {
		return errors.Unauthorized("Invalid credentials")
	}

	newJwt, _ := jwt.GenerateToken(model.AuthUser{
		Id:       foundUser.Id,
		Name:     foundUser.Name,
		Username: foundUser.Username,
		Email:    foundUser.Email,
	})

	return c.JSON(200, newJwt)
}

func (a AuthService) Current(c echo.Context) error {
	return c.JSON(200, c.Get("user"))
}
