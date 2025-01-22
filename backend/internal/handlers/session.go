package handler

import (
	"fmt"
	"log"
	"net/http"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/labstack/echo/v4"
)

func (h *Handler) CreateSession(c echo.Context) error {
	ctx := c.Request().Context()
	session := &models.SessionPostBody{}

	if err := c.Bind(session); err != nil {
		log.Printf("Error binding the session: %v", err)
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid request format",
		})
	}

	createdSession, err := h.SessionService.CreateSession(ctx, session)
	if err != nil {
		fmt.Print(err.Error())
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to create a session"})
	}

	return c.JSON(http.StatusCreated, createdSession.ToResponse())
}

func (h *Handler) GetSessions(c echo.Context) error {
	ctx := c.Request().Context()

	sessions, err := h.SessionService.GetSessions(ctx)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Unable to get sessions"})
	}

	return c.JSON(http.StatusOK, models.ToResponseList(sessions))
}

func (h *Handler) GetSessionsByID(c echo.Context) error {
	ctx := c.Request().Context() // Get context from the request
	userID := c.QueryParam("userID")

	if userID == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Param userID is missing"})
	}

	sessions, err := h.SessionService.GetByID(ctx, userID) // Pass context to service
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Unable to fetch the sessions"})
	}

	return c.JSON(http.StatusOK, models.ToResponseList(sessions))
}
