package jwt

import (
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/mattfan00/hoji/server/pkg/utl/config"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
)

func New() JwtService {
	return JwtService{}
}

type JwtService struct{}

func (j JwtService) ParseAccessToken(token string) (*jwt.Token, error) {
	signingKey := []byte(config.Values.AccessTokenSecret)

	return jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		return signingKey, nil
	})
}

func (j JwtService) ParseRefreshToken(token string) (*jwt.Token, error) {
	signingKey := []byte(config.Values.RefreshTokenSecret)

	return jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		return signingKey, nil
	})
}

func (j JwtService) GenerateAccessToken(user model.User) (string, error) {
	signingKey := []byte(config.Values.AccessTokenSecret)

	return jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id": user.Id,
		// expiration time is 15 minutes
		"exp": time.Now().Add(time.Minute * 15).Unix(),
	}).SignedString(signingKey)
}

func (j JwtService) GenerateRefreshToken(user model.User) (string, error) {
	signingKey := []byte(config.Values.RefreshTokenSecret)

	return jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id": user.Id,
		// expiration time is 100 days
		"exp": time.Now().Add(time.Hour * 24 * 100).Unix(),
	}).SignedString(signingKey)
}

func (j JwtService) GenerateTokens(user model.User) (model.AuthToken, error) {
	newAccessToken, err := j.GenerateAccessToken(user)

	if err != nil {
		return model.AuthToken{}, err
	}

	newRefreshToken, err := j.GenerateRefreshToken(user)

	if err != nil {
		return model.AuthToken{}, err
	}

	return model.AuthToken{
		Access:  newAccessToken,
		Refresh: newRefreshToken,
	}, err
}
