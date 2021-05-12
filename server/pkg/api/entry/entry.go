package entry

import (
	//"fmt"
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

	currUser := c.Get("user").(model.AuthUser)

	newEntry := model.Entry{
		UserId:      currUser.Id,
		Type:        body.Type,
		Title:       body.Title,
		Description: body.Description,
		Content:     body.Content,
	}

	_, err := e.db.Model(&newEntry).Insert()

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
	foundEntry := new(model.Entry)

	/*
		err := e.db.Model(foundEntry).
			Relation("User").Where("entry.id = ?", c.Param("id")).
			Column("entry.*").
			Select()
	*/

	sql := `SELECT "entry".*, "user"."id" AS "user__id",  "user"."username" AS "user__username" FROM "entries" AS "entry" LEFT JOIN "users" AS "user" ON 
	("user"."id" = "entry"."user_id") AND "user"."deleted_at" IS NULL WHERE ((entry.id = ?)) AND "entry"."deleted_at" IS NULL`

	_, err := e.db.QueryOne(foundEntry, sql, c.Param("id"))

	if err != nil {
		return errors.NotFound()
	}

	return c.JSON(http.StatusOK, foundEntry)
}

func (e EntryService) List(c echo.Context) error {
	entries := []model.Entry{}

	sql := `SELECT "entry".*, "user"."id" AS "user__id",  "user"."username" AS "user__username" FROM "entries" AS "entry" LEFT JOIN "users" AS "user" ON 
	("user"."id" = "entry"."user_id") AND "user"."deleted_at" IS NULL WHERE "entry"."deleted_at" IS NULL`

	_, err := e.db.Query(&entries, sql)

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, entries)
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

	currUser := c.Get("user").(model.AuthUser)

	// check if entry belongs to the current user
	foundEntry := new(model.Entry)
	err := e.db.Model(foundEntry).
		Where("id = ? AND user_id = ?", c.Param("id"), currUser.Id).Select()

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
	_, err = e.db.Model(&newValues).TableExpr("entries").
		Where("id = ?", c.Param("id")).UpdateNotZero()

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, "Successfully updated")
}

func (e EntryService) Delete(c echo.Context) error {
	currUser := c.Get("user").(model.AuthUser)

	// check if entry belongs to the current user
	foundEntry := new(model.Entry)
	err := e.db.Model(foundEntry).
		Where("id = ? AND user_id = ?", c.Param("id"), currUser.Id).Select()

	if err != nil {
		return errors.Unauthorized()
	}

	_, err = e.db.Model(foundEntry).Where("id = ?id").Delete()

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, "Successfully deleted")
}
