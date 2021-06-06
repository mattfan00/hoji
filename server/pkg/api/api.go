package api

import (
	"server/pkg/api/auth"
	"server/pkg/api/bookmark"
	"server/pkg/api/entry"
	"server/pkg/api/user"
	"server/pkg/utl/aws"
	"server/pkg/utl/config"
	"server/pkg/utl/errors"
	customMiddleware "server/pkg/utl/middleware"
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

	middlewareService := customMiddleware.New(pg)
	userService := user.New(pg, aws)
	authService := auth.New(pg)
	entryService := entry.New(pg, aws)
	bookmarkService := bookmark.New(pg)

	user.Routes(e, userService, middlewareService)
	auth.Routes(e, authService, middlewareService)
	entry.Routes(e, entryService, middlewareService)
	bookmark.Routes(e, bookmarkService, middlewareService)

	// Start server
	e.Logger.Fatal(e.Start(":8080"))
}
