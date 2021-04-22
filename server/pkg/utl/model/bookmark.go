package model

import (
	"context"
	"time"

	"github.com/satori/go.uuid"
)

type Bookmark struct {
	UserId         uuid.UUID `json:"user_id,omitempty" pg:",pk,type:uuid"`
	BookmarkUserId uuid.UUID `json:"bookmark_user_id,omitempty" pg:",pk,type:uuid"`
	BookmarkUser   *User     `json:"bookmark_user,omitempty" pg:"rel:has-one"`
	Active         bool      `json:"active,omitempty" pg:"default:true"`
	CreatedAt      time.Time `json:"created_at"`
}

func (b *Bookmark) BeforeInsert(ctx context.Context) (context.Context, error) {
	b.CreatedAt = time.Now().UTC()
	return ctx, nil
}
