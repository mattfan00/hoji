package user

import (
	"github.com/labstack/echo/v4"
)

func Routes(e *echo.Echo) {
	user := e.Group("/user")

	user.GET("", Get)
}
