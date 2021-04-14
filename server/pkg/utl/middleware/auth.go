package middleware

import (
	"server/pkg/utl/errors"
	"server/pkg/utl/jwt"
	"server/pkg/utl/model"

	jwtGo "github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"github.com/satori/go.uuid"
)

func Auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		cookie, err := c.Cookie("token")
		if err != nil {
			return errors.BadRequest("Invalid cookie")
		}

		token, err := jwt.ParseToken(cookie.Value)

		if err != nil {
			return err
		}

		if !token.Valid {
			return errors.Unauthorized()
		}

		claims := token.Claims.(jwtGo.MapClaims)

		uid, err := uuid.FromString(claims["id"].(string))

		if err != nil {
			return err
		}

		currUser := model.AuthUser{
			Id:       uid,
			Name:     claims["name"].(string),
			Username: claims["username"].(string),
			Email:    claims["email"].(string),
		}

		c.Set("user", currUser)

		return next(c)
	}
}
