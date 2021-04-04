package jwt

import (
	"server/pkg/utl/config"
	//"server/pkg/utl/errors"
	"server/pkg/utl/model"
	//"strings"

	jwt "github.com/dgrijalva/jwt-go"
)

func ParseToken(token string) (*jwt.Token, error) {
	/*
		parts := strings.SplitN(authHeader, " ", 2)
		if !(len(parts) == 2 && parts[0] == "Bearer") {
			return nil, errors.BadRequest("Invalid authorization header")
		}
	*/

	signingKey := []byte(config.Values.JWTSecret)

	return jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		return signingKey, nil
	})
}

func GenerateToken(user model.AuthUser) (string, error) {
	signingKey := []byte(config.Values.JWTSecret)

	return jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":       user.Id,
		"name":     user.Name,
		"username": user.Username,
		"email":    user.Email,
	}).SignedString(signingKey)
}
