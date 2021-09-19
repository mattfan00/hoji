package bookmark

import (
	"github.com/labstack/echo/v4"
	"github.com/mattfan00/hoji/server/pkg/utl/middleware"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
)

type RouteHandler struct {
	svc PageInterface
}

func Routes(e *echo.Echo, b PageInterface, mw middleware.MiddlewareInterface) {
	entry := e.Group("/page")
	r := RouteHandler{
		svc: b,
	}

	entry.POST("", r.create, mw.Auth)
	entry.GET("", r.list, mw.Auth)
	entry.DELETE("/:id", r.delete, mw.Auth)
}

type createReq struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

func (r RouteHandler) create(c echo.Context) error {
	body := createReq{}

	if err := c.Bind(&body); err != nil {
		return err
	}

	currUser := c.Get("user").(model.User)

	newPage, err := r.svc.Create(currUser, body)

	if err != nil {
		return err
	}

	return c.JSON(200, newPage)
}

func (r RouteHandler) list(c echo.Context) error {
	currUser := c.Get("user").(model.User)

	foundPages, err := r.svc.List(currUser)

	if err != nil {
		return err
	}

	return c.JSON(200, foundPages)
}

func (r RouteHandler) delete(c echo.Context) error {
	currUser := c.Get("user").(model.User)

	err := r.svc.Delete(currUser, c.Param("id"))

	if err != nil {
		return err
	}

	return c.JSON(200, "Successfully deleted")
}
