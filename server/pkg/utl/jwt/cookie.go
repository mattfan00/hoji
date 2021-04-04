package jwt

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func CreateCookie(c echo.Context, name string, value string) {
	cookie := new(http.Cookie)
	cookie.Name = name
	cookie.Value = value
	cookie.Secure = false
	cookie.HttpOnly = true
	c.SetCookie(cookie)
}
