package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	PgURI string

	AccessTokenSecret  string
	RefreshTokenSecret string

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
		PgURI:              os.Getenv("PG_URI"),
		AccessTokenSecret:  os.Getenv("ACCESS_TOKEN_SECRET"),
		RefreshTokenSecret: os.Getenv("REFRESH_TOKEN_SECRET"),
		AwsRegion:          os.Getenv("AWS_REGION"),
		AwsAccessKeyId:     os.Getenv("AWS_ACCESS_KEY_ID"),
		AwsSecretAccessKey: os.Getenv("AWS_SECRET_ACCESS_KEY"),
	}
}
