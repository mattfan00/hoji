package entry

import (
	"net/http"
	"server/pkg/utl/errors"
	"server/pkg/utl/model"

	"github.com/labstack/echo/v4"
)

type createReq struct {
	Type        string `json:"type" validate:"required" bson:"type,omitempty"`
	Title       string `json:"title" bson:"title,omitempty"`
	Description string `json:"description" bson:"description,omitempty"`
	Content     string `json:"content" bson:"content,omitempty"`
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
	var entries []model.Entry

	sql := `SELECT "entry".*, "user"."id" AS "user__id",  "user"."username" AS "user__username" FROM "entries" AS "entry" LEFT JOIN "users" AS "user" ON 
	("user"."id" = "entry"."user_id") AND "user"."deleted_at" IS NULL WHERE "entry"."deleted_at" IS NULL`

	_, err := e.db.Query(&entries, sql)

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, entries)
}
