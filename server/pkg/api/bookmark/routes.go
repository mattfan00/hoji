package bookmark

import (
	"server/pkg/utl/middleware"
	"server/pkg/utl/model"

	"github.com/labstack/echo/v4"
	"github.com/satori/go.uuid"
)

type RouteHandler struct {
	svc BookmarkInterface
}

func Routes(e *echo.Echo, b BookmarkInterface, mw middleware.MiddlewareInterface) {
	entry := e.Group("/bookmark")
	r := RouteHandler{
		svc: b,
	}

	entry.POST("", r.create, mw.Auth)
	entry.GET("", r.list, mw.Auth)
	entry.DELETE("/:bookmark_user_id", r.delete, mw.Auth)
}

type createReq struct {
	BookmarkUserId uuid.UUID `json:"bookmark_user_id"`
}

func (r RouteHandler) create(c echo.Context) error {
	body := createReq{}

	if err := c.Bind(&body); err != nil {
		return err
	}

	currUser := c.Get("user").(model.User)

	newBookmark, err := r.svc.Create(currUser, body)

	if err != nil {
		return err
	}

	return c.JSON(200, newBookmark)
}

func (r RouteHandler) list(c echo.Context) error {
	currUser := c.Get("user").(model.User)

	foundBookmarks, err := r.svc.List(currUser)

	if err != nil {
		return err
	}

	return c.JSON(200, foundBookmarks)
}

func (r RouteHandler) delete(c echo.Context) error {
	err := r.svc.Delete(c.Param("bookmark_user_id"))

	if err != nil {
		return err
	}

	return c.JSON(200, "Successfully deleted")
}
