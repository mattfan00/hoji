package bookmark

import (
	"server/pkg/utl/errors"
	"server/pkg/utl/model"
)

func (b BookmarkService) Create(currUser model.User, body createReq) (model.Bookmark, error) {
	if currUser.Id == body.BookmarkUserId {
		return model.Bookmark{}, errors.BadRequest("Cannot bookmark your own profile")
	}

	newBookmark := model.Bookmark{
		UserId:         currUser.Id,
		BookmarkUserId: body.BookmarkUserId,
	}

	err := b.udb.Create(b.db, &newBookmark)

	return newBookmark, err
}

func (b BookmarkService) List(currUser model.User) ([]model.Bookmark, error) {
	foundBookmarks, err := b.udb.List(b.db, currUser.Id.String())

	return foundBookmarks, err
}

func (b BookmarkService) Delete(bookmarkUserId string) error {
	err := b.udb.Delete(b.db, bookmarkUserId)

	return err
}
