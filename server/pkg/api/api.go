package api

import (
	"server/pkg/api/auth"
	"server/pkg/api/entry"
	"server/pkg/api/user"
	"server/pkg/utl/config"
	"server/pkg/utl/errors"
	"server/pkg/utl/mongo"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Start() {
	config.Init()

	db := mongo.Init()

	// Echo instance
	e := echo.New()

	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "method=${method}, uri=${uri}, status=${status}\n",
	}))

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowCredentials: true,
	}))

	e.Validator = &errors.CustomValidator{Validator: validator.New()}
	e.HTTPErrorHandler = errors.CustomHTTPErrorHandler

	userService := user.New(db)
	authService := auth.New(db)
	entryService := entry.New(db)

	user.Routes(e, userService)
	auth.Routes(e, authService)
	entry.Routes(e, entryService)

	// Start server
	e.Logger.Fatal(e.Start(":8080"))
}
