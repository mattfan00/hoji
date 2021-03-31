package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	Id       primitive.ObjectID `json:"_id" bson:"_id"`
	Email    string             `json:"email"`
	Name     string             `json:"name"`
	Username string             `json:"username"`
	Details  struct {
		Pronouns    string `json:"pronouns"`
		Description string `json:"description"`
		Website     string `json:"website"`
	} `json:"details"`
	Entries []string `json:"entries"`
}
