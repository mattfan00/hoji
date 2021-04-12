package model

import (
	"github.com/satori/go.uuid"
)

type Entry struct {
	Base
	UserId      uuid.UUID `json:"user_id" pg:"type:uuid"`
	User        *User     `json:"user" pg:"rel:has-one"`
	Type        string    `json:"type,omitempty"`
	Title       string    `json:"title,omitempty"`
	Description string    `json:"description,omitempty"`
	Content     string    `json:"content,omitempty"`
}
