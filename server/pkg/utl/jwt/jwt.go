package jwt

import (
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/mattfan00/hoji/server/pkg/utl/config"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
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
		// expiration time is 15 minutes
		"exp": time.Now().Add(time.Minute * 15).Unix(),
	}).SignedString(signingKey)
}

func GenerateRefreshToken(user model.User) (string, error) {
	signingKey := []byte(config.Values.RefreshTokenSecret)

	return jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id": user.Id,
		// expiration time is 100 days
		"exp": time.Now().Add(time.Hour * 24 * 100).Unix(),
	}).SignedString(signingKey)
}

func GenerateTokens(user model.User) (model.AuthToken, error) {
	newAccessToken, err := GenerateAccessToken(user)

	if err != nil {
		return model.AuthToken{}, err
	}

	newRefreshToken, err := GenerateRefreshToken(user)

	if err != nil {
		return model.AuthToken{}, err
	}

	return model.AuthToken{
		Access:  newAccessToken,
		Refresh: newRefreshToken,
	}, err
}
