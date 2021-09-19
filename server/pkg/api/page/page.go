package bookmark

import (
	"regexp"
	"strings"

	"github.com/mattfan00/hoji/server/pkg/utl/model"
)

func (p PageService) Create(currUser model.User, body createReq) (model.Page, error) {
	// Create url out of title
	reg, err := regexp.Compile("[^A-Za-z0-9]+")
	if err != nil {
		return model.Page{}, err
	}
	shorthand := reg.ReplaceAllString(body.Title, "-")
	shorthand = strings.ToLower(strings.Trim(shorthand, "-"))

	newPage := model.Page{
		Title:     body.Title,
		Shorthand: shorthand,
		Content:   body.Content,
	}

	err = p.udb.Create(p.db, &newPage)

	return newPage, err
}

func (p PageService) List(currUser model.User) ([]model.Page, error) {
	foundPages, err := p.udb.List(p.db, currUser.Id.String())

	return foundPages, err
}

func (p PageService) Delete(currUser model.User, id string) error {
	err := p.udb.Delete(p.db, currUser.Id.String(), id)

	return err
}
