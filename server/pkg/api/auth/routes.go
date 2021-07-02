package auth

import (
	"github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
	"github.com/labstack/echo/v4"
	"github.com/mattfan00/hoji/server/pkg/utl/cookie"
	"github.com/mattfan00/hoji/server/pkg/utl/errors"
	"github.com/mattfan00/hoji/server/pkg/utl/middleware"
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
	auth.POST("/refresh_token", r.refreshToken)
	auth.GET("/me", r.current, mw.Auth)
	auth.POST("/logout", r.logout, mw.Auth)
}

type registerReq struct {
	Email    string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
	Name     string `json:"name" bson:"name"`
	Username string `json:"username" bson:"username"`
}

func (r RouteHandler) register(c echo.Context) error {
	body := registerReq{}

	if err := c.Bind(&body); err != nil {
		return err
	}

	if err := validation.ValidateStruct(&body,
		validation.Field(&body.Email, validation.Required, is.Email),
		validation.Field(&body.Password, validation.Required, validation.Length(4, 0)),
		validation.Field(&body.Name, validation.Required, validation.Length(1, 50)),
		validation.Field(&body.Username, validation.Required, validation.Length(4, 20), validation.By(errors.IsUsername)),
	); err != nil {
		return err
	}

	newUser, authToken, err := r.svc.Register(body)

	if err != nil {
		return err
	}

	cookie.CreateCookie(c, "at", authToken.Access)
	cookie.CreateCookie(c, "rt", authToken.Refresh)

	return c.JSON(200, newUser)
}

type loginReq struct {
	Email    string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
}

func (r RouteHandler) login(c echo.Context) error {
	body := loginReq{}

	if err := c.Bind(&body); err != nil {
		return err
	}

	err := validation.ValidateStruct(&body,
		validation.Field(&body.Email, validation.Required, is.Email),
		validation.Field(&body.Password, validation.Required),
	)

	if err != nil {
		return err
	}

	foundUser, authToken, err := r.svc.Login(body)

	if err != nil {
		return err
	}

	cookie.CreateCookie(c, "at", authToken.Access)
	cookie.CreateCookie(c, "rt", authToken.Refresh)

	return c.JSON(200, foundUser)
}

func (r RouteHandler) check(c echo.Context) error {
	err := r.svc.Check(c.QueryParam("email"))

	if err != nil {
		return err
	}

	return c.JSON(200, "Email valid")
}

func (r RouteHandler) refreshToken(c echo.Context) error {
	rtCookie, err := c.Cookie("rt")

	if err != nil {
		return c.JSON(200, nil)
	}

	authToken, err := r.svc.RefreshToken(rtCookie.Value)

	if err != nil {
		return err
	}

	cookie.CreateCookie(c, "at", authToken.Access)
	cookie.CreateCookie(c, "rt", authToken.Refresh)

	return c.JSON(200, "hello")
}

func (r RouteHandler) current(c echo.Context) error {
	return c.JSON(200, c.Get("user"))
}

func (r RouteHandler) logout(c echo.Context) error {
	cookie.DeleteCookie(c, "at")
	cookie.DeleteCookie(c, "rt")

	return c.JSON(200, "Logged out")
}
