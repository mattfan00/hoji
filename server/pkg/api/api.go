package api

import (
	"github.com/mattfan00/hoji/server/pkg/api/auth"
	"github.com/mattfan00/hoji/server/pkg/api/bookmark"
	"github.com/mattfan00/hoji/server/pkg/api/entry"
	"github.com/mattfan00/hoji/server/pkg/api/user"
	"github.com/mattfan00/hoji/server/pkg/utl/aws"
	"github.com/mattfan00/hoji/server/pkg/utl/jwt"
	customMiddleware "github.com/mattfan00/hoji/server/pkg/utl/middleware"
	"github.com/mattfan00/hoji/server/pkg/utl/server"

	"github.com/go-pg/pg/v10"
)

func Start(pgClient *pg.DB, awsClient aws.Interface) {
	e := server.New()

	jwtService := jwt.New()

	middlewareService := customMiddleware.New(pgClient, jwtService)

	userService := user.New(pgClient, awsClient)
	authService := auth.New(pgClient, jwtService)
	entryService := entry.New(pgClient, awsClient)
	bookmarkService := bookmark.New(pgClient)

	user.Routes(e, userService, middlewareService)
	auth.Routes(e, authService, middlewareService)
	entry.Routes(e, entryService, middlewareService)
	bookmark.Routes(e, bookmarkService, middlewareService)

	// Start server
	e.Logger.Fatal(e.Start(":8080"))
}
