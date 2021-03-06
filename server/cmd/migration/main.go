package main

import (
	"fmt"
	"log"

	"github.com/go-pg/pg/v10"
	"github.com/go-pg/pg/v10/orm"
	"github.com/mattfan00/hoji/server/pkg/utl/config"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
)

func main() {
	config.Init()

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

	deleteQueries := []string{
		//"DROP TABLE IF EXISTS entries",
		//"DROP TABLE IF EXISTS bookmarks",
		//"DROP TABLE IF EXISTS users",
		"DROP TABLE IF EXISTS pages",
	}

	for _, q := range deleteQueries {
		_, err := db.Exec(q)
		if err != nil {
			log.Fatal(err)
		}
	}

	err = createSchema(db)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("created schema")
}

func createSchema(db *pg.DB) error {
	models := []interface{}{
		//(*model.User)(nil),
		//(*model.Entry)(nil),
		//(*model.Bookmark)(nil),
		(*model.Page)(nil),
	}

	for _, model := range models {
		err := db.Model(model).CreateTable(&orm.CreateTableOptions{
			FKConstraints: true,
		})
		if err != nil {
			return err
		}
	}
	return nil
}
