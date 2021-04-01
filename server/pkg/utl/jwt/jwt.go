package jwt

import (
	"server/pkg/utl/config"
	"server/pkg/utl/model"

	jwt "github.com/dgrijalva/jwt-go"
)

// func ParseToken(authHeader string)

func GenerateToken(user model.AuthUser) (string, error) {
	signingKey := []byte(config.Values.JWTSecret)

	return jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":       user.Id,
		"name":     user.Name,
		"username": user.Username,
		"email":    user.Email,
	}).SignedString(signingKey)
}
