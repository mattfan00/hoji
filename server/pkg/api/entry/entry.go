package entry

import (
	"context"
	"net/http"
	"server/pkg/utl/errors"
	"server/pkg/utl/model"
	"time"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type createReq struct {
	Type        string    `json:"type" validate:"required" bson:"type,omitempty"`
	Title       string    `json:"title" bson:"title,omitempty"`
	Description string    `json:"description" bson:"description,omitempty"`
	Content     string    `json:"content" bson:"content,omitempty"`
	Created     time.Time `json:"created" bson:"created,omitempty"`
}

func (e EntryService) Create(c echo.Context) error {
	body := new(createReq)

	if err := c.Bind(&body); err != nil {
		return err
	}

	if err := c.Validate(body); err != nil {
		return err
	}

	body.Created = time.Now()

	entryResult, err := e.db.Collection("entries").InsertOne(context.TODO(), body)

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, entryResult.InsertedID)
}

func (e EntryService) View(c echo.Context) error {
	var foundEntry model.Entry

	oid, _ := primitive.ObjectIDFromHex(c.Param("id"))
	err := e.db.Collection("entries").FindOne(context.TODO(), bson.M{
		"_id": oid,
	}).Decode(&foundEntry)

	if err != nil {
		return errors.NotFound()
	}

	return c.JSON(http.StatusOK, foundEntry)
}

func (e EntryService) List(c echo.Context) error {
	cursor, err := e.db.Collection("entries").Find(context.TODO(), bson.M{})
	if err != nil {
		return err
	}

	var entries []model.Entry
	if err = cursor.All(context.TODO(), &entries); err != nil {
		return err
	}

	return c.JSON(http.StatusOK, entries)
}
