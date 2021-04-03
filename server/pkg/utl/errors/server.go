package errors

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func NotFound() *echo.HTTPError {
	return echo.NewHTTPError(http.StatusNotFound, "Not Found")
}
