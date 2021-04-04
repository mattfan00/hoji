package errors

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func NotFound() *echo.HTTPError {
	return echo.NewHTTPError(http.StatusNotFound, "Not found")
}

func BadRequest(msgOpt ...string) *echo.HTTPError {
	msg := "Bad request"

	if len(msgOpt) > 0 {
		msg = msgOpt[0]
	}

	return echo.NewHTTPError(http.StatusBadRequest, msg)
}

func Unauthorized(msgOpt ...string) *echo.HTTPError {
	msg := "Not authorized"

	if len(msgOpt) > 0 {
		msg = msgOpt[0]
	}

	return echo.NewHTTPError(http.StatusUnauthorized, msg)
}
