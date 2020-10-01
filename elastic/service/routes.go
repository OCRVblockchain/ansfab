package service

func initializeRoutes(s *Webserver) {
	s.router.GET("/count", s.totalCount)
	s.router.GET("/rails", s.fetchWheelsets)
}
