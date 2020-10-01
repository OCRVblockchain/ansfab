package service

import (
	"github.com/auth0/go-jwt-middleware"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

const signingKey = "0123456789012345"

var jwtMiddleware = jwtmiddleware.New(jwtmiddleware.Options{
	ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
		return []byte(signingKey), nil
	},
	SigningMethod: jwt.SigningMethodHS256,
})

func checkJWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		jwtMid := *jwtMiddleware
		if err := jwtMid.CheckJWT(c.Writer, c.Request); err != nil {
			c.AbortWithStatus(401)
		}
	}
}
