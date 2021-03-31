package entry

import (
	"context"
	"log"
	"net/http"
	"server/pkg/utl/model"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
)

type createReq struct {
	Type        string `json:"type" validate:"required" bson:"type,omitempty"`
	Title       string `json:"title" bson:"title,omitempty"`
	Description string `json:"description" bson:"description,omitempty"`
	Content     string `json:"content" bson:"content,omitempty"`
}

func (e EntryService) Create(c echo.Context) error {
	body := new(createReq)

	if err := c.Bind(&body); err != nil {
		return err
	}
	if err := c.Validate(body); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	entryResult, _ := e.db.Collection("entries").InsertOne(context.TODO(), body)

	return c.JSON(200, entryResult.InsertedID)
}

func (e EntryService) View(c echo.Context) error {
	var foundUser model.User

	err := e.db.Collection("entries").FindOne(context.TODO(), bson.D{
		{Key: "username", Value: c.Param("username")},
	}).Decode(&foundUser)

	if err != nil {
		log.Fatal(err)
	}

	return c.JSON(200, foundUser)
}

func (e EntryService) List(c echo.Context) error {
	cursor, err := e.db.Collection("entries").Find(context.TODO(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	var entries []model.Entry
	if err = cursor.All(context.TODO(), &entries); err != nil {
		log.Fatal(err)
	}

	return c.JSON(200, entries)
}
