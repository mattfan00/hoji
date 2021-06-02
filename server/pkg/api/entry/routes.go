package entry

import (
	"server/pkg/utl/middleware"

	"github.com/labstack/echo/v4"
)

func Routes(e *echo.Echo, en EntryInterface) {
	entry := e.Group("/entry")

	entry.GET("/list", en.List)
	entry.GET("/:id", en.View)
	entry.POST("", en.Create, middleware.Auth)
	entry.POST("/image", en.UploadImage, middleware.Auth)
	entry.PUT("/:id", en.Update, middleware.Auth)
	entry.DELETE("/:id", en.Delete, middleware.Auth)
}
