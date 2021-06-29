package model

import (
	"github.com/satori/go.uuid"
)

type User struct {
	Base
	Email       string   `json:"email,omitempty" pg:",unique"`
	Password    string   `json:"-"`
	Name        string   `json:"name,omitempty"`
	Username    string   `json:"username,omitempty" pg:",unique"`
	Avatar      string   `json:"avatar,omitempty"`
	Description string   `json:"description,omitempty"`
	Website     string   `json:"website,omitempty"`
	Location    string   `json:"location,omitempty"`
	Entries     []*Entry `json:"entries,omitempty" pg:"rel:has-many"`
}

// the data stored in the JWT
type AuthUser struct {
	Id uuid.UUID `json:"id"`
	//Name     string    `json:"name"`
	//Username string    `json:"username"`
	//Email    string    `json:"email"`
}
