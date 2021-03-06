package model

import (
	"github.com/satori/go.uuid"
)

type Entry struct {
	Base
	Type        string `json:"type,omitempty"`
	Title       string `json:"title,omitempty"`
	Description string `json:"description,omitempty"`
	Content     string `json:"content,omitempty"`
	//Published   bool      `json:"-" pg:"default:true"`
	UserId uuid.UUID `json:"user_id,omitempty" pg:"type:uuid"`
	User   *User     `json:"user,omitempty" pg:"rel:has-one"`
}
