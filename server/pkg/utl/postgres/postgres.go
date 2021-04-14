package postgres

import (
	"fmt"
	"log"
	"server/pkg/utl/config"

	"github.com/go-pg/pg/v10"
)

func Init() *pg.DB {
	opt, err := pg.ParseURL(config.Values.PgURI)
	if err != nil {
		log.Fatal(err)
	}

	db := pg.Connect(opt)

	_, err = db.Exec("SELECT 1")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("connected to db")

	return db
}
