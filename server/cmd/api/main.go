package main

import (
	"server/pkg/api"
	"server/pkg/utl/aws"
	"server/pkg/utl/config"
	"server/pkg/utl/postgres"
)

func main() {
	config.Init()
	pg := postgres.Init()
	aws := aws.Init()

	api.Start(pg, aws)

}
