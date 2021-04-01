package auth

import (
	"github.com/labstack/echo/v4"
)

func Routes(e *echo.Echo, a AuthInterface) {
	auth := e.Group("/auth")

	auth.POST("/register", a.Register)
}
