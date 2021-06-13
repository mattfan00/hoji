package middleware

import (
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/mattfan00/hoji/server/pkg/utl/errors"
)

func (mw *MiddlewareService) Pagination(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		cursor := c.QueryParam("cursor")

		if cursor == "" {
			return errors.BadRequest("Need to provide cursor")
		}

		cursorInt, err := strconv.Atoi(cursor)

		if err != nil {
			return errors.BadRequest("Couldn't read the cursor provided")
		}

		c.Set("cursor", cursorInt)

		return next(c)
	}
}
