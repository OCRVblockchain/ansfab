package service

import (
	"github.com/elastic/go-elasticsearch/v7"
	"github.com/gin-gonic/gin"
	"gitlab.sch.ocrv.com.rzd/blockchain/elastic/config"
	"log"
)

type Webserver struct {
	config  *config.Config
	router  *gin.Engine
	elastic *elasticsearch.Client
}

func NewWebserver(conf *config.Config) *Webserver {
	var err error
	es, err := elasticsearch.NewDefaultClient()
	if err != nil {
		log.Fatalf("Error creating the client: %s", err)
	}

	return &Webserver{
		config:  conf,
		router:  gin.Default(),
		elastic: es,
	}
}

func (s *Webserver) Start() {
	s.router.Use(CORSMiddleware())
	//s.router.Use(checkJWT())

	initializeRoutes(s)

	s.router.Run("0.0.0.0:8888")
}
