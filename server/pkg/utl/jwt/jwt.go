package jwt

import (
	"github.com/mattfan00/hoji/server/pkg/utl/config"
	"github.com/mattfan00/hoji/server/pkg/utl/model"

	jwt "github.com/dgrijalva/jwt-go"
)

func ParseAccessToken(token string) (*jwt.Token, error) {
	signingKey := []byte(config.Values.AccessTokenSecret)

	return jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		return signingKey, nil
	})
}

func ParseRefreshToken(token string) (*jwt.Token, error) {
	signingKey := []byte(config.Values.RefreshTokenSecret)

	return jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		return signingKey, nil
	})
}

func GenerateAccessToken(user model.User) (string, error) {
	signingKey := []byte(config.Values.AccessTokenSecret)

	return jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id": user.Id,
	}).SignedString(signingKey)
}

func GenerateRefreshToken(user model.User) (string, error) {
	signingKey := []byte(config.Values.RefreshTokenSecret)

	return jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id": user.Id,
	}).SignedString(signingKey)
}
