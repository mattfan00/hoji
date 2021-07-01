package auth

import (
	jwtGo "github.com/dgrijalva/jwt-go"
	"github.com/mattfan00/hoji/server/pkg/utl/constants"
	"github.com/mattfan00/hoji/server/pkg/utl/errors"
	"github.com/mattfan00/hoji/server/pkg/utl/jwt"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
	"golang.org/x/crypto/bcrypt"
)

func (a AuthService) Register(body registerReq) (model.User, error) {
	// check if the desired username is invalid
	for _, username := range constants.InvalidUsernames {
		if body.Username == username {
			return model.User{}, errors.BadRequest("Username is unavailable")
		}
	}

	hashed, _ := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
	body.Password = string(hashed)

	newUser := model.User{
		Email:    body.Email,
		Password: body.Password,
		Name:     body.Name,
		Username: body.Username,
	}

	err := a.udb.Register(a.db, &newUser)

	return newUser, err
}

func (a AuthService) Login(body loginReq) (model.User, error) {
	foundUser, err := a.udb.CheckEmail(a.db, body.Email)

	// couldn't find user
	if err != nil {
		return model.User{}, errors.Unauthorized("Invalid credentials")
	}

	// check for password
	err = bcrypt.CompareHashAndPassword([]byte(foundUser.Password), []byte(body.Password))

	if err != nil {
		return model.User{}, errors.Unauthorized("Invalid credentials")
	}

	return foundUser, nil
}

func (a AuthService) Check(email string) error {
	_, err := a.udb.CheckEmail(a.db, email)

	if err != nil {
		return nil
	}

	return errors.BadRequest("Email already in use")
}

func (a AuthService) RefreshToken(refreshToken string) (string, string, error) {
	token, err := jwt.ParseRefreshToken(refreshToken)

	if err != nil {
		return "", "", err
	}

	if !token.Valid {
		return "", "", errors.BadRequest("Token is not valid")
	}

	claims := token.Claims.(jwtGo.MapClaims)

	foundUser, err := a.udb.View(a.db, claims["id"].(string))

	if err != nil {
		return "", "", err
	}

	newAccessToken, err := jwt.GenerateAccessToken(foundUser)

	if err != nil {
		return "", "", err
	}

	newRefreshToken, err := jwt.GenerateRefreshToken(foundUser)

	if err != nil {
		return "", "", err
	}

	return newAccessToken, newRefreshToken, err
}
