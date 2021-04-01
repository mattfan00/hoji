package mongo

import (
	"context"
	"fmt"
	"log"
	"server/pkg/utl/config"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

// var Db *mongo.Database

func Init() *mongo.Database {
	client, err := mongo.NewClient(options.Client().ApplyURI(config.Values.MongoURI))
	if err != nil {
		log.Fatal(err)
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("database ready")

	// Db = client.Database("projects")

	return client.Database("hoji")

	// return client
}
