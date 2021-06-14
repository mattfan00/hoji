package bookmark

import (
	"github.com/mattfan00/hoji/server/pkg/utl/errors"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
)

func (b BookmarkService) Create(currUser model.User, body createReq) (model.Bookmark, error) {
	if currUser.Id == body.BookmarkUserId {
		return model.Bookmark{}, errors.BadRequest("Cannot bookmark your own profile")
	}

	_, err := b.udb.FindUser(b.db, body.BookmarkUserId.String())

	if err != nil {
		return model.Bookmark{}, errors.BadRequest("Bookmarked user does not exist")
	}

	newBookmark := model.Bookmark{
		UserId:         currUser.Id,
		BookmarkUserId: body.BookmarkUserId,
	}

	err = b.udb.Create(b.db, &newBookmark)

	return newBookmark, err
}

func (b BookmarkService) List(currUser model.User) ([]model.Bookmark, error) {
	foundBookmarks, err := b.udb.List(b.db, currUser.Id.String())

	return foundBookmarks, err
}

func (b BookmarkService) Delete(currUser model.User, bookmarkUserId string) error {
	err := b.udb.Delete(b.db, currUser.Id.String(), bookmarkUserId)

	return err
}
