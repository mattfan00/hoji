package jwt

import (
	"errors"
	"server/pkg/utl/config"
	"server/pkg/utl/model"
	"strings"

	jwt "github.com/dgrijalva/jwt-go"
)

func ParseToken(authHeader string) (*jwt.Token, error) {
	parts := strings.SplitN(authHeader, " ", 2)
	if !(len(parts) == 2 && parts[0] == "Bearer") {
		return nil, errors.New("invalid auth header")
	}

	signingKey := []byte(config.Values.JWTSecret)

	return jwt.Parse(parts[1], func(token *jwt.Token) (interface{}, error) {
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
