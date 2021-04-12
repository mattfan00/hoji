package model

import (
	//"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserDetails struct {
	Description string `json:"description,omitempty" bson:"description,omitempty"`
	Website     string `json:"website,omitempty" bson:"website,omitempty"`
}

type User struct {
	Base
	Email       string `json:"email"`
	Password    string `json:"-"`
	Name        string `json:"name"`
	Username    string `json:"username"`
	Description string `json:"description"`
	Website     string `json:"website"`
	//Entries  interface{}        `json:"entries"`
}

type PublicUser struct {
	Id       primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Email    string             `json:"email"`
	Name     string             `json:"name"`
	Username string             `json:"username"`
	Details  UserDetails        `json:"details"`
	Entries  []string           `json:"entries"`
}

// the data stored in the JWT
type AuthUser struct {
	Id       primitive.ObjectID `json:"_id" bson:"_id"`
	Name     string             `json:"name" bson:"name"`
	Username string             `json:"username" bson:"username"`
	Email    string             `json:"email" bson:"email"`
}
