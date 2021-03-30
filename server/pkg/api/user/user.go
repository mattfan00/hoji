package user

import "github.com/labstack/echo/v4"

type User struct {
	Email    string `json:"email"`
	Name     string `json:"name"`
	Username string `json:"username"`
}

func Get(c echo.Context) error {
	newUser := User{
		Email:    "test@test.com",
		Name:     "Matthew Fan",
		Username: "matt",
	}

	return c.JSON(200, newUser)
}
