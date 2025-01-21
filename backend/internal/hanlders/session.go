package handler

import (
	"fmt"
	"log"
	"net/http"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/labstack/echo/v4"
)

func (h *Handler) CreateSession(c echo.Context) error {
	session := &models.SessionPostBody{}

	if err := c.Bind(session); err != nil {
		log.Printf("Error binding the session %v", err)
		return err
	}

	createdSession, err := h.SessionService.CreateSession(session)
	if err != nil {
		fmt.Print(err.Error())
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to create a session"})
	}

	return c.JSON(http.StatusCreated, createdSession)
}

func (h *Handler) GetSessions(c echo.Context) error {

	sessions, err := h.SessionService.GetSessions()
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Unable to get sessions"})
	}

	return c.JSON(http.StatusCreated, sessions)

}

func (h *Handler) GetSessionsByID(c echo.Context) error {
	userID := c.QueryParam("userID")

	if userID == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": `Param userID is missing`})
	}

	sessions, err := h.SessionService.GetByID(userID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Unable to fetch the sessions"})
	}

	return c.JSON(http.StatusCreated, sessions)

}
