package auth

import (
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/mattfan00/hoji/server/pkg/utl/constants"
	"github.com/mattfan00/hoji/server/pkg/utl/errors"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
	"golang.org/x/crypto/bcrypt"
)

func (a AuthService) Register(body registerReq) (model.User, model.AuthToken, error) {
	// check if the desired username is invalid
	for _, username := range constants.InvalidUsernames {
		if body.Username == username {
			return model.User{}, model.AuthToken{}, errors.BadRequest("Username is unavailable")
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

	if err != nil {
		return model.User{}, model.AuthToken{}, err
	}

	newAuthToken, err := a.jwt.GenerateTokens(newUser)

	if err != nil {
		return model.User{}, model.AuthToken{}, err
	}

	newUser.Token = newAuthToken.Refresh
	err = a.udb.Update(a.db, &newUser)

	return newUser, newAuthToken, err
}

func (a AuthService) Login(body loginReq) (model.User, model.AuthToken, error) {
	foundUser, err := a.udb.CheckEmail(a.db, body.Email)

	// couldn't find user
	if err != nil {
		return model.User{}, model.AuthToken{}, errors.Unauthorized("Invalid credentials")
	}

	// check for password
	err = bcrypt.CompareHashAndPassword([]byte(foundUser.Password), []byte(body.Password))

	if err != nil {
		return model.User{}, model.AuthToken{}, errors.Unauthorized("Invalid credentials")
	}

	newAuthToken, err := a.jwt.GenerateTokens(foundUser)

	if err != nil {
		return model.User{}, model.AuthToken{}, err
	}

	foundUser.Token = newAuthToken.Refresh
	err = a.udb.Update(a.db, &foundUser)

	return foundUser, newAuthToken, err
}

func (a AuthService) Check(email string) error {
	_, err := a.udb.CheckEmail(a.db, email)

	if err != nil {
		return nil
	}

	return errors.BadRequest("Email already in use")
}

func (a AuthService) RefreshToken(refreshToken string) (model.AuthToken, error) {
	token, err := a.jwt.ParseRefreshToken(refreshToken)

	if err != nil {
		return model.AuthToken{}, err
	}

	// if the provided refresh token is expired
	if !token.Valid {
		return model.AuthToken{}, errors.Unauthorized("Token is not valid")
	}

	claims := token.Claims.(jwt.MapClaims)

	foundUser, err := a.udb.View(a.db, claims["id"].(string))

	if err != nil {
		return model.AuthToken{}, err
	}

	// if the provided refresh token is invalid
	// immediately invalidate the current valid refresh token and force
	// everyone to relogin
	if foundUser.Token != refreshToken {
		foundUser.Token = ""
		err = a.udb.Update(a.db, &foundUser)

		return model.AuthToken{}, errors.Unauthorized("Token is not valid")
	}

	newAuthToken, err := a.jwt.GenerateTokens(foundUser)

	// update the user with the newest refresh token
	foundUser.Token = newAuthToken.Refresh
	err = a.udb.Update(a.db, &foundUser)

	return newAuthToken, err
}
