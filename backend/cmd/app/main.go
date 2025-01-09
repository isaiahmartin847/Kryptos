package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {

	e := echo.New()


	e.GET("/test", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{
			"message": "test 123",
		})
	})


	e.Start(":8080")
}