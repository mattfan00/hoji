package jwt

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func BaseCookie() http.Cookie {
	return http.Cookie{
		Path:     "/",
		Secure:   false,
		HttpOnly: true,
	}
}

func CreateCookie(c echo.Context, name string, value string) {
	cookie := BaseCookie()
	cookie.Name = name
	cookie.Value = value

	c.SetCookie(&cookie)
}

func DeleteCookie(c echo.Context, name string) {
	cookie := BaseCookie()
	cookie.Name = name
	cookie.MaxAge = -1

	c.SetCookie(&cookie)
}
