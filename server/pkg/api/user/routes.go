package user

import (
	"github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
	"github.com/labstack/echo/v4"
	"github.com/mattfan00/hoji/server/pkg/utl/errors"
	"github.com/mattfan00/hoji/server/pkg/utl/middleware"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
)

type RouteHandler struct {
	svc UserInterface
}

func Routes(e *echo.Echo, u UserInterface, mw middleware.MiddlewareInterface) {
	user := e.Group("/user")
	r := RouteHandler{
		svc: u,
	}

	user.GET("/:username", r.view)
	user.PUT("/:username", r.update, mw.Auth)
	user.PUT("/:username/avatar", r.updateAvatar, mw.Auth)
	user.DELETE("/:username/avatar", r.removeAvatar, mw.Auth)
}

func (r RouteHandler) view(c echo.Context) error {
	foundUser, err := r.svc.View(c.Param("username"))

	if err != nil {
		return c.JSON(200, nil)
	}

	return c.JSON(200, foundUser)
}

type updateReq struct {
	Name        string `json:"name"`
	Username    string `json:"username"`
	Description string `json:"description,omitempty"`
	Website     string `json:"website,omitempty"`
}

func (r RouteHandler) update(c echo.Context) error {
	body := updateReq{}

	if err := c.Bind(&body); err != nil {
		return err
	}

	err := validation.ValidateStruct(&body,
		validation.Field(&body.Name, validation.Required, validation.Length(1, 50)),
		validation.Field(&body.Username, validation.Required, validation.Length(4, 20), validation.By(errors.IsUsername)),
		validation.Field(&body.Description, validation.Length(0, 280)),
		validation.Field(&body.Website, validation.Length(0, 280), is.URL),
	)

	if err != nil {
		return err
	}

	currUser := c.Get("user").(model.User)

	err = r.svc.Update(currUser, c.Param("username"), body)

	if err != nil {
		return err
	}

	/*
		// create a new JWT token
		newAuthUser := model.AuthUser{
			Id: currUser.Id,
			//Name:     body.Name,
			//Username: body.Username,
			//Email:    currUser.Email,
		}

		if err != nil {
			return err
		}

		newJwt, err := jwt.GenerateToken(newAuthUser)

		if err != nil {
			return err
		}

		jwt.CreateCookie(c, "token", newJwt)
	*/

	return c.JSON(200, "Successfully updated")
}

func (r RouteHandler) updateAvatar(c echo.Context) error {
	currUser := c.Get("user").(model.User)

	form, err := c.MultipartForm()

	if err != nil {
		return err
	}

	file := form.File["file"][0]

	fileLocation, err := r.svc.UpdateAvatar(currUser, c.Param("username"), file)

	if err != nil {
		return err
	}

	return c.JSON(200, fileLocation)
}

func (r RouteHandler) removeAvatar(c echo.Context) error {
	currUser := c.Get("user").(model.User)

	err := r.svc.RemoveAvatar(currUser, c.Param("username"))

	if err != nil {
		return err
	}

	return c.JSON(200, "Successfully removed avatar")
}
