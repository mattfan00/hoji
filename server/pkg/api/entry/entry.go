package entry

import (
	"mime/multipart"
	"time"

	"github.com/mattfan00/hoji/server/pkg/utl/constants"
	"github.com/mattfan00/hoji/server/pkg/utl/errors"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
)

func (e EntryService) Create(currUser model.User, body createReq) (model.Entry, error) {
	newEntry := model.Entry{
		UserId:      currUser.Id,
		Type:        body.Type,
		Title:       body.Title,
		Description: body.Description,
		Content:     body.Content,
	}

	err := e.udb.Create(e.db, &newEntry)

	return newEntry, err

}

func (e EntryService) UploadImage(file *multipart.FileHeader) (string, error) {
	fileLocation, err := e.aws.AddObject(file, "hoji", "/entry")

	return fileLocation, err
}

func (e EntryService) View(id string) (model.Entry, error) {
	foundEntry, err := e.udb.View(e.db, id)

	return foundEntry, err
}

func (e EntryService) List(cursor int) ([]model.Entry, int, error) {
	entries, err := e.udb.List(e.db, constants.PageSize, cursor)

	if err != nil {
		return entries, 0, err
	}

	nextCursor := 0
	if len(entries) >= constants.PageSize {
		nextCursor = cursor + constants.PageSize
	}

	return entries, nextCursor, err
}

func (e EntryService) Update(currUser model.User, id string, body updateReq) error {
	// check if entry belongs to the current user
	_, err := e.udb.FindByUser(e.db, id, currUser.Id.String())

	if err != nil {
		return errors.Unauthorized()
	}

	// update the appropriate entry
	newValues := map[string]interface{}{
		"title":       body.Title,
		"description": body.Description,
		"content":     body.Content,
		"updated_at":  time.Now().UTC(),
	}

	err = e.udb.Update(e.db, newValues, id)

	return err
}

func (e EntryService) Delete(currUser model.User, id string) error {
	// check if entry belongs to the current user
	foundEntry, err := e.udb.FindByUser(e.db, id, currUser.Id.String())

	if err != nil {
		return errors.Unauthorized()
	}

	err = e.udb.Delete(e.db, foundEntry)

	return err

}
