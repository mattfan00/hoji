package entry

import (
	"server/pkg/utl/middleware"

	"github.com/labstack/echo/v4"
)

func Routes(e *echo.Echo, en EntryInterface) {
	entry := e.Group("/entry")

	entry.GET("/:id", en.View)
	entry.GET("", en.List)
	entry.POST("", en.Create, middleware.Auth)
	entry.DELETE("/:id", en.Delete, middleware.Auth)
}
