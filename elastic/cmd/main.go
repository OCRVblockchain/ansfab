package main

import (
	"gitlab.sch.ocrv.com.rzd/blockchain/elastic/config"
	"gitlab.sch.ocrv.com.rzd/blockchain/elastic/service"
)

func main() {
	conf := config.GetConfig()
	server := service.NewWebserver(conf)
	server.Start()
}
