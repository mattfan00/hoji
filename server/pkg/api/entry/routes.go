package entry

import (
	"server/pkg/utl/middleware"

	"github.com/labstack/echo/v4"
)

func Routes(e *echo.Echo, en EntryInterface, mw middleware.MiddlewareInterface) {
	entry := e.Group("/entry")

	entry.GET("/list", en.List, mw.Pagination)
	entry.GET("/:id", en.View)
	entry.POST("", en.Create, mw.Auth)
	entry.POST("/image", en.UploadImage, mw.Auth)
	entry.PUT("/:id", en.Update, mw.Auth)
	entry.DELETE("/:id", en.Delete, mw.Auth)
}
