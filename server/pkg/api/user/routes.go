package user

import (
	"server/pkg/utl/middleware"

	"github.com/labstack/echo/v4"
)

func Routes(e *echo.Echo, u UserInterface, mw middleware.MiddlewareInterface) {
	user := e.Group("/user")

	user.GET("/:username", u.View)
	user.PUT("/:username", u.Update, mw.Auth)
	user.PUT("/:username/avatar", u.UpdateAvatar, mw.Auth)
	user.DELETE("/:username/avatar", u.RemoveAvatar, mw.Auth)
}
