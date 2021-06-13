package main

import (
	"github.com/mattfan00/hoji/server/pkg/api"
	"github.com/mattfan00/hoji/server/pkg/utl/aws"
	"github.com/mattfan00/hoji/server/pkg/utl/config"
	"github.com/mattfan00/hoji/server/pkg/utl/postgres"
)

func main() {
	config.Init()
	pg := postgres.Init()
	aws := aws.Init()

	api.Start(pg, aws)

}
