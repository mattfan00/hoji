package bookmark

import (
	"server/pkg/utl/middleware"

	"github.com/labstack/echo/v4"
)

func Routes(e *echo.Echo, b BookmarkInterface, mw middleware.MiddlewareInterface) {
	entry := e.Group("/bookmark")

	entry.POST("", b.Create, mw.Auth)
	entry.GET("", b.List, mw.Auth)
	entry.DELETE("/:bookmark_user_id", b.Delete, mw.Auth)
}
