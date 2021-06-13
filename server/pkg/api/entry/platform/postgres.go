package platform

import (
	"github.com/go-pg/pg/v10"
	"github.com/mattfan00/hoji/server/pkg/utl/model"
)

type Postgres struct{}

func (postgres Postgres) Create(db *pg.DB, entry *model.Entry) error {
	_, err := db.Model(entry).Insert()

	return err
}

func (postgres Postgres) View(db *pg.DB, id string) (model.Entry, error) {
	foundEntry := model.Entry{}

	/*
		err := e.db.Model(foundEntry).
			Relation("User").Where("entry.id = ?", c.Param("id")).
			Column("entry.*").
			Select()
	*/

	sql := `SELECT "entry".*, "user"."id" AS "user__id", "user"."username" AS "user__username", "user"."avatar" AS "user__avatar" FROM "entries" AS "entry" LEFT JOIN "users" AS "user" ON 
	("user"."id" = "entry"."user_id") AND "user"."deleted_at" IS NULL WHERE ((entry.id = ?)) AND "entry"."deleted_at" IS NULL`

	_, err := db.QueryOne(&foundEntry, sql, id)

	return foundEntry, err
}

func (postgres Postgres) List(db *pg.DB, limit int, cursor int) ([]model.Entry, error) {
	entries := []model.Entry{}

	sql := `SELECT "entry".*, "user"."id" AS "user__id", "user"."username" AS "user__username", "user"."avatar" AS "user__avatar"  FROM "entries" AS "entry" 
	LEFT JOIN "users" AS "user" ON ("user"."id" = "entry"."user_id") AND "user"."deleted_at" IS NULL WHERE "entry"."deleted_at" IS NULL 
	ORDER BY "entry"."created_at" DESC LIMIT ? OFFSET ?`

	_, err := db.Query(&entries, sql, limit, cursor)

	return entries, err
}

func (postgres Postgres) FindByUser(db *pg.DB, entryId string, userId string) (model.Entry, error) {
	foundEntry := model.Entry{}

	err := db.Model(&foundEntry).
		Where("id = ? AND user_id = ?", entryId, userId).Select()

	return foundEntry, err
}

func (postgres Postgres) Update(db *pg.DB, newValues map[string]interface{}, id string) error {
	_, err := db.Model(&newValues).TableExpr("entries").
		Where("id = ?", id).UpdateNotZero()

	return err
}

func (postgres Postgres) Delete(db *pg.DB, entry model.Entry) error {
	_, err := db.Model(&entry).Where("id = ?id").Delete()

	return err
}
