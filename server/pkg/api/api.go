package api

import (
	"server/pkg/api/user"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Start() {
	// Echo instance
	e := echo.New()

	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "method=${method}, uri=${uri}, status=${status}\n",
	}))

	user.Routes(e)

	// Start server
	e.Logger.Fatal(e.Start(":8080"))
}
