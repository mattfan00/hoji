package server

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/mattfan00/hoji/server/pkg/utl/errors"
)

func New() *echo.Echo {
	// Echo instance
	e := echo.New()

	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "method=${method}, uri=${uri}, status=${status}\n",
	}))

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowCredentials: true,
	}))

	e.Use(middleware.RateLimiter(middleware.NewRateLimiterMemoryStore(20)))

	e.HTTPErrorHandler = errors.CustomHTTPErrorHandler

	e.GET("/", func(c echo.Context) error {
		return c.JSON(200, "Health check")
	})

	return e
}
