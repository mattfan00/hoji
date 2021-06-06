package bookmark

import (
	"fmt"
	"server/pkg/utl/errors"
	"server/pkg/utl/model"

	"github.com/labstack/echo/v4"
	"github.com/satori/go.uuid"
)

type createReq struct {
	BookmarkUserId uuid.UUID `json:"bookmark_user_id"`
}

func (b BookmarkService) Create(c echo.Context) error {
	body := new(createReq)

	if err := c.Bind(&body); err != nil {
		return err
	}

	currUser := c.Get("user").(model.User)

	if currUser.Id == body.BookmarkUserId {
		return errors.BadRequest("Cannot bookmark your own profile")
	}

	newBookmark := model.Bookmark{
		UserId:         currUser.Id,
		BookmarkUserId: body.BookmarkUserId,
	}

	// update active to be true if the bookmark exists already
	_, err := b.db.Model(&newBookmark).
		OnConflict("(user_id, bookmark_user_id) DO UPDATE").
		Set("active = EXCLUDED.active").
		Insert()

	if err != nil {
		fmt.Println(err)
		return err
	}

	return c.JSON(200, newBookmark)
}

func (b BookmarkService) List(c echo.Context) error {
	currUser := c.Get("user").(model.User)

	foundBookmarks := []model.Bookmark{}
	err := b.db.Model(&foundBookmarks).
		Where("user_id = ? AND active = ?", currUser.Id, true).
		Relation("BookmarkUser").
		Select()

	if err != nil {
		return err
	}

	return c.JSON(200, foundBookmarks)
}

func (b BookmarkService) Delete(c echo.Context) error {
	values := map[string]interface{}{
		"active": false,
	}

	_, err := b.db.Model(&values).
		TableExpr("bookmarks").
		Where("bookmark_user_id = ?", c.Param("bookmark_user_id")).
		Update()

	if err != nil {
		return err
	}

	return c.JSON(200, "Successfully deleted")
}
