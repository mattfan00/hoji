package postgres

import (
	"fmt"
	"log"

	"github.com/go-pg/pg/extra/pgdebug"
	"github.com/go-pg/pg/v10"
	"github.com/mattfan00/hoji/server/pkg/utl/config"
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

	db.AddQueryHook(pgdebug.DebugHook{
		// Print all queries.
		Verbose: true,
	})

	return db
}
