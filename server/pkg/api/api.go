package api

import (
	"server/pkg/api/auth"
	"server/pkg/api/bookmark"
	"server/pkg/api/entry"
	"server/pkg/api/user"
	"server/pkg/utl/aws"
	customMiddleware "server/pkg/utl/middleware"
	"server/pkg/utl/server"

	"github.com/go-pg/pg/v10"
)

func Start(pgClient *pg.DB, awsClient *aws.Service) {
	e := server.New()

	middlewareService := customMiddleware.New(pgClient)
	userService := user.New(pgClient, awsClient)
	authService := auth.New(pgClient)
	entryService := entry.New(pgClient, awsClient)
	bookmarkService := bookmark.New(pgClient)

	user.Routes(e, userService, middlewareService)
	auth.Routes(e, authService, middlewareService)
	entry.Routes(e, entryService, middlewareService)
	bookmark.Routes(e, bookmarkService, middlewareService)

	// Start server
	e.Logger.Fatal(e.Start(":8080"))
}
