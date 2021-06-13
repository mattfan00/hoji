package platform

import (
	"github.com/go-pg/pg/v10"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
)

type Postgres struct{}

func (postgres Postgres) Create(db *pg.DB, newBookmark *model.Bookmark) error {
	// update active to be true if the bookmark exists already
	_, err := db.Model(newBookmark).
		OnConflict("(user_id, bookmark_user_id) DO UPDATE").
		Set("active = EXCLUDED.active").
		Insert()

	return err
}

func (postgres Postgres) List(db *pg.DB, userId string) ([]model.Bookmark, error) {
	foundBookmarks := []model.Bookmark{}

	err := db.Model(&foundBookmarks).
		Where("user_id = ? AND active = ?", userId, true).
		Relation("BookmarkUser").
		Select()

	return foundBookmarks, err
}

func (postgres Postgres) Delete(db *pg.DB, id string) error {
	// instead of hard/soft deleting, updates "active" field to be false
	values := map[string]interface{}{
		"active": false,
	}

	_, err := db.Model(&values).
		TableExpr("bookmarks").
		Where("bookmark_user_id = ?", id).
		Update()

	return err
}
