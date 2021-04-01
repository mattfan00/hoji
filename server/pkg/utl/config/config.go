package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	MongoURI  string
	JWTSecret string
}

var Values *Config

func Init() {
	if err := godotenv.Load(); err != nil {
		panic(err)
	}

	Values = &Config{
		MongoURI:  os.Getenv("MONGO_URI"),
		JWTSecret: os.Getenv("JWT_SECRET"),
	}
}
