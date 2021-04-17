package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	MongoURI  string
	PgURI     string
	JWTSecret string

	AwsRegion          string
	AwsAccessKeyId     string
	AwsSecretAccessKey string
}

var Values *Config

func Init() {
	if err := godotenv.Load(); err != nil {
		panic(err)
	}

	Values = &Config{
		MongoURI:           os.Getenv("MONGO_URI"),
		PgURI:              os.Getenv("PG_URI"),
		JWTSecret:          os.Getenv("JWT_SECRET"),
		AwsRegion:          os.Getenv("AWS_REGION"),
		AwsAccessKeyId:     os.Getenv("AWS_ACCESS_KEY_ID"),
		AwsSecretAccessKey: os.Getenv("AWS_SECRET_ACCESS_KEY"),
	}
}
