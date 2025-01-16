package handler

import (
	"log"
	"net/http"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/labstack/echo/v4"
)

func (h *Handler) CreateSession(c echo.Context) error {
	session := &models.Session{}

	if err := c.Bind(session); err != nil {
		log.Printf("Error binding the session %v", err)
		return err
	}

	createdSession, err := h.SessionService.CreateSession(&models.Session{})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to create a season"})
	}

	return c.JSON(http.StatusCreated, createdSession)
}
