package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Entry struct {
	Id          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Author      string             `json:"author,omitempty" bson:"author,omitempty"`
	Type        string             `json:"type,omitempty" bson:"type,omitempty"`
	Title       string             `json:"title,omitempty" bson:"title,omitempty"`
	Description string             `json:"description,omitempty" bson:"description,omitempty"`
	Content     string             `json:"content,omitempty" bson:"content,omitempty"`
	Photos      []string           `json:"photos,omitempty" bson:"photos,omitempty"`
	Created     time.Time          `json:"created,omitempty" bson:"created,omitempty"`
}
