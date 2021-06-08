package entry

import (
	"net/http"
	"server/pkg/utl/errors"
	"server/pkg/utl/model"
	"time"

	//"github.com/fatih/structs"
	//"github.com/jinzhu/copier"
	"github.com/labstack/echo/v4"
)

type createReq struct {
	Type        string `json:"type" validate:"required"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Content     string `json:"content"`
}

func (e EntryService) Create(c echo.Context) error {
	body := new(createReq)

	if err := c.Bind(&body); err != nil {
		return err
	}

	if err := c.Validate(body); err != nil {
		return err
	}

	currUser := c.Get("user").(model.User)

	newEntry := model.Entry{
		UserId:      currUser.Id,
		Type:        body.Type,
		Title:       body.Title,
		Description: body.Description,
		Content:     body.Content,
	}

	err := e.udb.Create(e.db, &newEntry)

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, newEntry)
}

func (e EntryService) UploadImage(c echo.Context) error {
	form, err := c.MultipartForm()

	if err != nil {
		return err
	}

	file := form.File["file"][0]

	fileLocation, err := e.aws.AddObject(file, "hoji", "/entry")

	if err != nil {
		return err
	}

	return c.JSON(200, fileLocation)
}

func (e EntryService) View(c echo.Context) error {
	foundEntry, err := e.udb.View(e.db, c.Param("id"))

	if err != nil {
		return c.JSON(http.StatusOK, nil)
	}

	return c.JSON(http.StatusOK, foundEntry)
}

func (e EntryService) List(c echo.Context) error {
	type response struct {
		Entries    []model.Entry `json:"entries"`
		NextCursor int           `json:"nextCursor,omitempty"`
	}

	PAGE_SIZE := 20
	cursor := c.Get("cursor").(int)

	entries, err := e.udb.List(e.db, PAGE_SIZE, cursor)

	if err != nil {
		return err
	}

	nextCursor := 0
	if len(entries) >= PAGE_SIZE {
		nextCursor = cursor + PAGE_SIZE
	}

	return c.JSON(http.StatusOK, response{
		entries,
		nextCursor,
	})
}

type updateReq struct {
	Title       string `json:"title" structs:"title"`
	Description string `json:"description" structs:"description"`
	Content     string `json:"content" structs:"content"`
}

func (e EntryService) Update(c echo.Context) error {
	body := new(updateReq)

	if err := c.Bind(body); err != nil {
		return err
	}

	currUser := c.Get("user").(model.User)

	// check if entry belongs to the current user
	_, err := e.udb.FindByUser(e.db, c.Param("id"), currUser.Id.String())

	if err != nil {
		return errors.Unauthorized()
	}

	// update the appropriate entry
	newValues := map[string]interface{}{
		"title":       body.Title,
		"description": body.Description,
		"content":     body.Content,
		"updated_at":  time.Now().UTC(),
	}

	err = e.udb.Update(e.db, newValues, c.Param("id"))

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, "Successfully updated")
}

func (e EntryService) Delete(c echo.Context) error {
	currUser := c.Get("user").(model.User)

	// check if entry belongs to the current user
	foundEntry, err := e.udb.FindByUser(e.db, c.Param("id"), currUser.Id.String())

	if err != nil {
		return errors.Unauthorized()
	}

	err = e.udb.Delete(e.db, foundEntry)

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, "Successfully deleted")
}
