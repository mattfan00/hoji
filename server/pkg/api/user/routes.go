package user

import (
	"server/pkg/utl/middleware"

	"github.com/labstack/echo/v4"
)

func Routes(e *echo.Echo, u UserInterface) {
	user := e.Group("/user")

	user.GET("/:username", u.View)
	user.PUT("/:username", u.Update, middleware.Auth)
}
