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

	currUser := c.Get("user").(model.AuthUser)

	if currUser.Id == body.BookmarkUserId {
		return errors.BadRequest("Cannot bookmark your own profile")
	}

	newBookmark := model.Bookmark{
		UserId:         currUser.Id,
		BookmarkUserId: body.BookmarkUserId,
	}

	_, err := b.db.Model(&newBookmark).Insert()

	if err != nil {
		return err
	}

	return c.JSON(200, newBookmark)
}

func (b BookmarkService) List(c echo.Context) error {
	currUser := c.Get("user").(model.AuthUser)

	foundBookmarks := []model.Bookmark{}
	err := b.db.Model(&foundBookmarks).
		Where("user_id = ?", currUser.Id).
		Relation("BookmarkUser").
		Select()

	if err != nil {
		return err
	}

	return c.JSON(200, foundBookmarks)
}

func (b BookmarkService) Delete(c echo.Context) error {
	_, err := b.db.Model((*model.Bookmark)(nil)).
		Where("bookmark_user_id = ?", c.Param("bookmark_user_id")).
		Delete()

	if err != nil {
		return err
	}

	return c.JSON(200, "Successfully deleted")
}
