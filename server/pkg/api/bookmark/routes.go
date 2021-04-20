package bookmark

import (
	"server/pkg/utl/middleware"

	"github.com/labstack/echo/v4"
)

func Routes(e *echo.Echo, b BookmarkInterface) {
	entry := e.Group("/bookmark")

	entry.POST("", b.Create, middleware.Auth)
	entry.GET("", b.List, middleware.Auth)
}
