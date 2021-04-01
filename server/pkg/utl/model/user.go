package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	Id       primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Email    string             `json:"email"`
	Password string             `json:"password"`
	Name     string             `json:"name"`
	Username string             `json:"username"`
	Details  UserDetails        `json:"details"`
	Entries  []string           `json:"entries"`
	Created  time.Time          `json:"created"`
}

type UserDetails struct {
	Description string `json:"description,omitempty" bson:"description,omitempty"`
	Website     string `json:"website,omitempty" bson:"website,omitempty"`
}
