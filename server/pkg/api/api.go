package api

import (
	"server/pkg/api/user"
	"server/pkg/utl/mongo"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Start() {
	db := mongo.Init()

	// Echo instance
	e := echo.New()

	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "method=${method}, uri=${uri}, status=${status}\n",
	}))

	userService := user.New(db)

	user.Routes(e, userService)

	// Start server
	e.Logger.Fatal(e.Start(":8080"))
}
