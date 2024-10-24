package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
  r := gin.Default()
  r.GET("/ping", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{
      "message": "pong",
    })
  })
  r.GET("/demo/:user/:id", func(c *gin.Context) {
	var user = c.Param("user")
	var id = c.Param("id")
    c.JSON(http.StatusOK, gin.H{
      "user": user,
      "id": id,
    })
  })

  r.POST("/demo",func (c *gin.Context){	
	type DemoBody struct{
		Email string `json:"email"`
		Name string `json:"name"`
	}

	var demoRequest DemoBody
	content := c.BindJSON(&demoRequest)
	fmt.Printf("%v\n",content)
	c.JSON(http.StatusCreated, gin.H{
		"user":demoRequest.Email,
		"name":demoRequest.Name,
	})
  })
  r.Run(":8000")
}