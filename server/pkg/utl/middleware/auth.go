package middleware

import (
	"server/pkg/utl/errors"
	"server/pkg/utl/jwt"
	"server/pkg/utl/model"

	jwtGo "github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		cookie, err := c.Cookie("token")
		if err != nil {
			return errors.BadRequest("Invalid cookie")
		}

		//token, err := jwt.ParseToken(c.Request().Header.Get("Authorization"))
		token, err := jwt.ParseToken(cookie.Value)

		if err != nil {
			return err
		}

		if !token.Valid {
			return errors.Unauthorized()
		}

		claims := token.Claims.(jwtGo.MapClaims)

		oid, err := primitive.ObjectIDFromHex(claims["id"].(string))

		if err != nil {
			return err
		}

		currUser := model.AuthUser{
			Id:       oid,
			Name:     claims["name"].(string),
			Username: claims["username"].(string),
			Email:    claims["email"].(string),
		}

		c.Set("user", currUser)

		return next(c)
	}
}
