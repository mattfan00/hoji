package user

import (
	"github.com/labstack/echo/v4"
)

func Routes(e *echo.Echo, u UserInterface) {
	user := e.Group("/user")

	user.GET("/:username", u.View)
}
