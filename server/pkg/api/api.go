package api

import (
	"fmt"
	"net/http"
	"server/pkg/api/auth"
	"server/pkg/api/entry"
	"server/pkg/api/user"
	"server/pkg/utl/config"
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

	e.Validator = &CustomValidator{validator: validator.New()}
	e.HTTPErrorHandler = customHTTPErrorHandler

	userService := user.New(db)
	authService := auth.New(db)
	entryService := entry.New(db)

	user.Routes(e, userService)
	auth.Routes(e, authService)
	entry.Routes(e, entryService)

	// Start server
	e.Logger.Fatal(e.Start(":8080"))
}

type CustomValidator struct {
	validator *validator.Validate
}

func (cv *CustomValidator) Validate(i interface{}) error {
	if err := cv.validator.Struct(i); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return nil
}

func customHTTPErrorHandler(err error, c echo.Context) {
	fmt.Println(err)

	type Response struct {
		Message interface{} `json:"message"`
	}

	var (
		code     int
		response Response
	)

	code = http.StatusInternalServerError
	response = Response{err.Error()}

	switch customError := err.(type) {
	case *echo.HTTPError:
		code = customError.Code
		response = Response{customError.Message}
	}

	c.JSON(code, response)
}
