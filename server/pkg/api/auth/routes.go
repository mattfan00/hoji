package auth

import (
	"server/pkg/utl/jwt"
	"server/pkg/utl/middleware"
	"server/pkg/utl/model"

	"github.com/labstack/echo/v4"
)

type RouteHandler struct {
	svc AuthInterface
}

func Routes(e *echo.Echo, a AuthInterface, mw middleware.MiddlewareInterface) {
	auth := e.Group("/auth")
	r := RouteHandler{
		svc: a,
	}

	auth.POST("/register", r.register)
	auth.POST("/login", r.login)
	auth.POST("/check", r.check)
	auth.GET("/me", r.current, mw.Auth)
	auth.POST("/logout", r.logout, mw.Auth)
}

type registerReq struct {
	Email       string `json:"email" bson:"email" validate:"required,email"`
	Password    string `json:"password" bson:"password" validate:"required,min=4"`
	Name        string `json:"name" bson:"name" validate:"required"`
	Username    string `json:"username" bson:"username" validate:"required"`
	Description string `json:"description,omitempty" bson:"description,omitempty"`
	Website     string `json:"website,omitempty" bson:"website,omitempty"`
}

func (r RouteHandler) register(c echo.Context) error {
	body := registerReq{}

	if err := c.Bind(&body); err != nil {
		return err
	}

	if err := c.Validate(&body); err != nil {
		return err
	}

	newUser, err := r.svc.Register(body)

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

func (r RouteHandler) login(c echo.Context) error {
	body := loginReq{}

	if err := c.Bind(&body); err != nil {
		return err
	}

	if err := c.Validate(&body); err != nil {
		return err
	}

	foundUser, err := r.svc.Login(body)

	if err != nil {
		return err
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

func (r RouteHandler) check(c echo.Context) error {
	err := r.svc.Check(c.QueryParam("email"))

	if err != nil {
		return err
	}

	return c.JSON(200, "Email valid")
}

func (r RouteHandler) current(c echo.Context) error {
	return c.JSON(200, c.Get("user"))
}

func (r RouteHandler) logout(c echo.Context) error {
	jwt.DeleteCookie(c, "token")

	return c.JSON(200, "Logged out")
}
