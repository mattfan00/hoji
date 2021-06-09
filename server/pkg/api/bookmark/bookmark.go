package bookmark

import (
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

	err := b.udb.Create(b.db, &newBookmark)

	if err != nil {
		return err
	}

	return c.JSON(200, newBookmark)
}

func (b BookmarkService) List(c echo.Context) error {
	currUser := c.Get("user").(model.User)

	foundBookmarks, err := b.udb.List(b.db, currUser.Id.String())

	if err != nil {
		return err
	}

	return c.JSON(200, foundBookmarks)
}

func (b BookmarkService) Delete(c echo.Context) error {
	err := b.udb.Delete(b.db, c.Param("bookmark_user_id"))

	if err != nil {
		return err
	}

	return c.JSON(200, "Successfully deleted")
}
