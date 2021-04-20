package model

import (
	"github.com/satori/go.uuid"
)

type Bookmark struct {
	UserId uuid.UUID `json:"user_id,omitempty" pg:"type:uuid"`
	//User   *User     `json:"user,omitempty" pg:"rel:has-one"`
	BookmarkUserId uuid.UUID `json:"bookmark_user_id,omitempty" pg:"type:uuid"`
	BookmarkUser   *User     `json:"bookmark_user,omitempty" pg:"rel:has-one"`
}
