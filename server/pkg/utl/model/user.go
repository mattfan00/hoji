package model

import (
	"github.com/satori/go.uuid"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserDetails struct {
	Description string `json:"description,omitempty" bson:"description,omitempty"`
	Website     string `json:"website,omitempty" bson:"website,omitempty"`
}

type User struct {
	Base
	Email       string   `json:"email,omitempty" pg:",unique"`
	Password    string   `json:"-"`
	Name        string   `json:"name,omitempty"`
	Username    string   `json:"username,omitempty" pg:",unique"`
	Avatar      string   `json:"avatar,omitempty"`
	Description string   `json:"description,omitempty"`
	Website     string   `json:"website,omitempty"`
	Entries     []*Entry `json:"entries,omitempty" pg:"rel:has-many"`
}

type PublicUser struct {
	Id       primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Email    string             `json:"email"`
	Name     string             `json:"name"`
	Username string             `json:"username"`
	Details  UserDetails        `json:"details"`
	Entries  []string           `json:"entries"`
}

// the data stored in the JWT
type AuthUser struct {
	Id       uuid.UUID `json:"id"`
	Name     string    `json:"name"`
	Username string    `json:"username"`
	Email    string    `json:"email"`
}
