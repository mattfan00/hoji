package middleware

import (
	jwtGo "github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"github.com/mattfan00/hoji/server/pkg/utl/errors"
	"github.com/mattfan00/hoji/server/pkg/utl/jwt"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
)

func (mw *MiddlewareService) Auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		cookie, err := c.Cookie("at")

		if err != nil {
			return c.JSON(200, nil)
		}

		token, err := jwt.ParseAccessToken(cookie.Value)

		if err != nil {
			return err
		}

		if !token.Valid {
			return errors.Unauthorized()
		}

		claims := token.Claims.(jwtGo.MapClaims)

		currUser := model.User{}

		err = mw.db.Model(&currUser).
			Where("id = ?", claims["id"].(string)).Select()

		if err != nil {
			return err
		}

		c.Set("user", currUser)

		return next(c)
	}
}
