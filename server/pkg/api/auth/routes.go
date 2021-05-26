package auth

import (
	"server/pkg/utl/middleware"

	"github.com/labstack/echo/v4"
)

func Routes(e *echo.Echo, a AuthInterface) {
	auth := e.Group("/auth")

	auth.POST("/register", a.Register)
	auth.POST("/login", a.Login)
	auth.POST("/check", a.Check)
	auth.GET("/me", a.Current, middleware.Auth)
	auth.POST("/logout", a.Logout, middleware.Auth)
}
