package api

import (
	"server/pkg/api/auth"
	"server/pkg/api/entry"
	"server/pkg/api/user"
	"server/pkg/utl/config"
	"server/pkg/utl/errors"
	"server/pkg/utl/mongo"
	"server/pkg/utl/postgres"

	"github.com/go-pg/pg/extra/pgdebug"
	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Start() {
	config.Init()

	db := mongo.Init()
	pg := postgres.Init()

	pg.AddQueryHook(pgdebug.DebugHook{
		// Print all queries.
		Verbose: true,
	})

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

	userService := user.New(db, pg)
	authService := auth.New(pg)
	entryService := entry.New(pg)

	user.Routes(e, userService)
	auth.Routes(e, authService)
	entry.Routes(e, entryService)

	// Start server
	e.Logger.Fatal(e.Start(":8080"))
}
