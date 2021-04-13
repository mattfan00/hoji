package entry

import (
	//"context"
	"net/http"
	//"server/pkg/utl/errors"
	//"server/pkg/utl/model"
	//"time"

	"github.com/labstack/echo/v4"
	//"go.mongodb.org/mongo-driver/bson"
	//"go.mongodb.org/mongo-driver/bson/primitive"
)

type createReq struct {
	Type        string `json:"type" validate:"required" bson:"type,omitempty"`
	Title       string `json:"title" bson:"title,omitempty"`
	Description string `json:"description" bson:"description,omitempty"`
	Content     string `json:"content" bson:"content,omitempty"`
}

func (e EntryService) Create(c echo.Context) error {
	/*
		body := new(createReq)

		if err := c.Bind(&body); err != nil {
			return err
		}

		if err := c.Validate(body); err != nil {
			return err
		}

		currUser := c.Get("user").(model.AuthUser)

		newEntry := model.Entry{
			Author:      currUser.Id,
			Type:        body.Type,
			Title:       body.Title,
			Description: body.Description,
			Content:     body.Content,
			Created:     time.Now(),
		}

		entryResult, err := e.db.Collection("entries").InsertOne(context.TODO(), newEntry)

		_, err = e.db.Collection("users").UpdateOne(
			context.TODO(),
			bson.M{"_id": currUser.Id},
			bson.M{"$push": bson.M{"entries": entryResult.InsertedID}},
		)

		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, entryResult.InsertedID)
	*/
	return c.JSON(http.StatusOK, "hey")
}

func (e EntryService) View(c echo.Context) error {
	/*
		var foundEntry model.Entry

		oid, _ := primitive.ObjectIDFromHex(c.Param("id"))
		err := e.db.Collection("entries").FindOne(context.TODO(), bson.M{
			"_id": oid,
		}).Decode(&foundEntry)

		if err != nil {
			return errors.NotFound()
		}

		var foundUser model.User
		err = e.db.Collection("users").FindOne(context.TODO(), bson.M{
			"_id": foundEntry.Author,
		}).Decode(&foundUser)

		if err != nil {
			return errors.NotFound()
		}

		foundEntry.Author = foundUser.Username

		return c.JSON(http.StatusOK, foundEntry)
	*/
	return c.JSON(http.StatusOK, "hey")
}

func (e EntryService) List(c echo.Context) error {
	/*
		cursor, err := e.db.Collection("entries").Find(context.TODO(), bson.M{})
		if err != nil {
			return err
		}

		var entries []model.Entry
		if err = cursor.All(context.TODO(), &entries); err != nil {
			return err
		}

		return c.JSON(http.StatusOK, entries)
	*/
	return c.JSON(http.StatusOK, "hey")
}
