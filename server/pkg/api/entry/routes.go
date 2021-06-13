package entry

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/mattfan00/hoji/server/pkg/utl/middleware"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
)

type RouteHandler struct {
	svc EntryInterface
}

func Routes(e *echo.Echo, en EntryInterface, mw middleware.MiddlewareInterface) {
	entry := e.Group("/entry")
	r := RouteHandler{
		svc: en,
	}

	entry.GET("/list", r.list, mw.Pagination)
	entry.GET("/:id", r.view)
	entry.POST("", r.create, mw.Auth)
	entry.POST("/image", r.uploadImage, mw.Auth)
	entry.PUT("/:id", r.update, mw.Auth)
	entry.DELETE("/:id", r.delete, mw.Auth)
}

func (r RouteHandler) list(c echo.Context) error {
	type response struct {
		Entries    []model.Entry `json:"entries"`
		NextCursor int           `json:"nextCursor,omitempty"`
	}

	entries, nextCursor, err := r.svc.List(c.Get("cursor").(int))

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, response{
		entries,
		nextCursor,
	})
}

func (r RouteHandler) view(c echo.Context) error {
	foundEntry, err := r.svc.View(c.Param("id"))

	if err != nil {
		return c.JSON(http.StatusOK, nil)
	}

	return c.JSON(http.StatusOK, foundEntry)
}

type createReq struct {
	Type        string `json:"type" validate:"required"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Content     string `json:"content"`
}

func (r RouteHandler) create(c echo.Context) error {
	body := createReq{}

	if err := c.Bind(&body); err != nil {
		return err
	}

	if err := c.Validate(&body); err != nil {
		return err
	}

	currUser := c.Get("user").(model.User)

	newEntry, err := r.svc.Create(currUser, body)

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, newEntry)
}

func (r RouteHandler) uploadImage(c echo.Context) error {
	form, err := c.MultipartForm()

	if err != nil {
		return err
	}

	file := form.File["file"][0]

	fileLocation, err := r.svc.UploadImage(file)

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, fileLocation)
}

type updateReq struct {
	Title       string `json:"title" structs:"title"`
	Description string `json:"description" structs:"description"`
	Content     string `json:"content" structs:"content"`
}

func (r RouteHandler) update(c echo.Context) error {
	body := updateReq{}

	if err := c.Bind(&body); err != nil {
		return err
	}

	currUser := c.Get("user").(model.User)

	err := r.svc.Update(currUser, c.Param("id"), body)

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, "Successfully updated")
}

func (r RouteHandler) delete(c echo.Context) error {
	currUser := c.Get("user").(model.User)

	err := r.svc.Delete(currUser, c.Param("id"))

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, "Successfully deleted")
}
