package api

import (
	"server/pkg/api/auth"
	"server/pkg/api/bookmark"
	"server/pkg/api/entry"
	"server/pkg/api/user"
	"server/pkg/utl/aws"
	"server/pkg/utl/config"
	"server/pkg/utl/errors"
	"server/pkg/utl/postgres"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Start() {
	config.Init()
	pg := postgres.Init()
	aws := aws.Init()

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

	userService := user.New(pg, aws)
	authService := auth.New(pg)
	entryService := entry.New(pg)
	bookmarkService := bookmark.New(pg)

	user.Routes(e, userService)
	auth.Routes(e, authService)
	entry.Routes(e, entryService)
	bookmark.Routes(e, bookmarkService)

	// Start server
	e.Logger.Fatal(e.Start(":8080"))
}
