package entry

import (
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
)

type EntryInterface interface {
	View(echo.Context) error
	Create(echo.Context) error
	List(echo.Context) error
}

type EntryService struct {
	db *mongo.Database
}

func New(db *mongo.Database) *EntryService {
	return &EntryService{
		db: db,
	}
}
