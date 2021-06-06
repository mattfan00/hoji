package auth

import (
	"server/pkg/utl/errors"
	"server/pkg/utl/jwt"
	"server/pkg/utl/model"
	"strings"

	"github.com/go-pg/pg/v10"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

type registerReq struct {
	Email       string `json:"email" bson:"email" validate:"required,email"`
	Password    string `json:"password" bson:"password" validate:"required,min=4"`
	Name        string `json:"name" bson:"name" validate:"required"`
	Username    string `json:"username" bson:"username" validate:"required"`
	Description string `json:"description,omitempty" bson:"description,omitempty"`
	Website     string `json:"website,omitempty" bson:"website,omitempty"`
}

func (a AuthService) Register(c echo.Context) error {
	body := new(registerReq)

	if err := c.Bind(&body); err != nil {
		return err
	}

	if err := c.Validate(body); err != nil {
		return err
	}

	foundUser := new(model.User)

	// check if email exists already
	err := a.db.Model(foundUser).Where("lower(email) = ?", strings.ToLower(body.Email)).Select()
	if err == nil || err != pg.ErrNoRows {
		return errors.BadRequest("Email already in use")
	}

	// check if username exists already
	err = a.db.Model(foundUser).Where("lower(username) = ?", strings.ToLower(body.Username)).Select()
	if err == nil || err != pg.ErrNoRows {
		return errors.BadRequest("Username already in use")
	}

	hashed, _ := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
	body.Password = string(hashed)

	newUser := model.User{
		Email:       body.Email,
		Password:    body.Password,
		Name:        body.Name,
		Username:    body.Username,
		Description: body.Description,
		Website:     body.Website,
	}

	_, err = a.db.Model(&newUser).Insert()

	if err != nil {
		return err
	}

	newAuthUser := model.AuthUser{
		Id: newUser.Id,
		//Name:     newUser.Name,
		//Username: newUser.Username,
		//Email:    newUser.Email,
	}

	newJwt, err := jwt.GenerateToken(newAuthUser)

	if err != nil {
		return err
	}

	jwt.CreateCookie(c, "token", newJwt)

	return c.JSON(200, newUser)
}

type loginReq struct {
	Email    string `json:"email" bson:"email" validate:"required"`
	Password string `json:"password" bson:"password" validate:"required"`
}

func (a AuthService) Login(c echo.Context) error {
	body := new(loginReq)

	if err := c.Bind(&body); err != nil {
		return err
	}

	if err := c.Validate(body); err != nil {
		return err
	}

	foundUser := new(model.User)

	err := a.db.Model(foundUser).Where("lower(email) = ?", strings.ToLower(body.Email)).Select()

	// couldn't find user
	if err != nil {
		return errors.Unauthorized("Invalid credentials")
	}

	// check for password
	err = bcrypt.CompareHashAndPassword([]byte(foundUser.Password), []byte(body.Password))

	if err != nil {
		return errors.Unauthorized("Invalid credentials")
	}

	newAuthUser := model.AuthUser{
		Id: foundUser.Id,
		//Name:     foundUser.Name,
		//Username: foundUser.Username,
		//Email:    foundUser.Email,
	}

	newJwt, _ := jwt.GenerateToken(newAuthUser)

	jwt.CreateCookie(c, "token", newJwt)

	return c.JSON(200, foundUser)
}

func (a AuthService) Check(c echo.Context) error {
	foundUser := new(model.User)

	err := a.db.Model(foundUser).Where("lower(email) = ?", strings.ToLower(c.QueryParam("email"))).Select()

	if err != nil {
		return c.JSON(200, "Email valid")
	}

	return errors.BadRequest("Email already in use")
}

func (a AuthService) Current(c echo.Context) error {
	return c.JSON(200, c.Get("user"))
}

func (a AuthService) Logout(c echo.Context) error {
	jwt.DeleteCookie(c, "token")

	return c.JSON(200, "Logged out")
}
