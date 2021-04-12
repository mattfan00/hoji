package main

import (
	"fmt"
	"log"
	"server/pkg/utl/config"
	"server/pkg/utl/model"

	"github.com/go-pg/pg/v10"
	"github.com/go-pg/pg/v10/orm"
)

func main() {
	config.Init()

	opt, err := pg.ParseURL(config.Values.PgURI)
	if err != nil {
		log.Fatal(err)
	}

	db := pg.Connect(opt)

	deleteQueries := []string{
		"DROP TABLE IF EXISTS entries",
		"DROP TABLE IF EXISTS users",
	}

	for _, q := range deleteQueries {
		_, err := db.Exec(q)
		if err != nil {
			log.Fatal(err)
		}
	}

	_, err = db.Exec("SELECT 1")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("connected to db")

	err = createSchema(db)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("created schema")
}

func createSchema(db *pg.DB) error {
	models := []interface{}{
		(*model.User)(nil),
		(*model.Entry)(nil),
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
