package model

import (
	"context"
	"time"

	"github.com/satori/go.uuid"
)

type Base struct {
	Id        uuid.UUID `json:"id" pg:",pk,type:uuid,default:uuid_generate_v4()"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	DeletedAt time.Time `json:"deleted_at,omitempty" pg:",soft_delete"`
}

func (b *Base) BeforeInsert(ctx context.Context) (context.Context, error) {
	now := time.Now()
	b.CreatedAt = now
	b.UpdatedAt = now
	return ctx, nil
}

// BeforeUpdate hooks into update operations, setting updatedAt to current time
func (b *Base) BeforeUpdate(ctx context.Context) (context.Context, error) {
	b.UpdatedAt = time.Now()
	return ctx, nil
}
