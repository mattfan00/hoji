package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Entry struct {
	Id          primitive.ObjectID `json:"_id,omitempty" bson:"_id"`
	Type        string             `json:"type,omitempty" bson:"type,omitempty"`
	Title       string             `json:"title,omitempty" bson:"title,omitempty"`
	Description string             `json:"description,omitempty" bson:"description,omitempty"`
	Content     string             `json:"content,omitempty" bson:"content,omitempty"`
	Photos      []string           `json:"photos,omitempty" bson:"photos,omitempty"`
}
