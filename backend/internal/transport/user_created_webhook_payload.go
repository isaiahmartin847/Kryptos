package handler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/labstack/echo/v4"
)


func (h *Handler) UserWebhookPayload (c echo.Context) error {
	payload := &models.WebhookLoginPayload{}

	if err := c.Bind(payload); err != nil {
		log.Printf("Error binding the payload: %v", err)
		return err
	}

	payloadJSON, err := json.Marshal(payload)
	if err != nil {
		return err
	}
	fmt.Print(string(payloadJSON))

	return c.JSON(http.StatusCreated, "success")


}