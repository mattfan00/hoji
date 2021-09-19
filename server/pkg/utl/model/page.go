package model

import (
	"context"
	"time"

	uuid "github.com/satori/go.uuid"
)

type Page struct {
	Id        uuid.UUID `json:"id,omitempty" pg:",pk,type:uuid,default:uuid_generate_v4()"`
	UserId    uuid.UUID `json:"user_id,omitempty" pg:",pk,type:uuid"`
	Title     string    `json:"title,omitempty"`
	Shorthand string    `json:"shorthand,omitempty"`
	Content   string    `json:"content,omitempty"`
	CreatedAt time.Time `json:"created_at"`
}

func (p *Page) BeforeInsert(ctx context.Context) (context.Context, error) {
	p.CreatedAt = time.Now().UTC()
	return ctx, nil
}
