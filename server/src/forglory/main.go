package main

import (
	api "forglory/api"
	data "forglory/data"
	log "github.com/sirupsen/logrus"
	"os"
)

func main() {
	log.SetOutput(os.Stdout)

	data.DB, _ = data.NewDb()

	apiServer, err := api.NewServer("0.0.0.0:8000", os.Stdout)
	if err != nil {
		panic(err)
	}

	log.Info("Starting HTTP server...")
	apiServer.ListenAndServe()
}
