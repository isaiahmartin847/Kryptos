package handler

import (
	"net/http"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/logger"
	"github.com/labstack/echo/v4"
)

func (h *Handler) UserWebhookPayload() echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := c.Request().Context()

		payload := &models.WebhookLoginPayload{}

		if err := c.Bind(payload); err != nil {
			logger.Error("Error binding the payload: %v", err)
			return err
		}

		user := models.User{
			ID:        payload.Data.ID,
			FirstName: payload.Data.FirstName,
			LastName:  payload.Data.LastName,
			Email:     payload.Data.EmailAddresses[0].EmailAddress,
			CreatedAt: uint64(payload.Data.CreatedAt),
		}

		_, err := h.UserService.CreateUser(ctx, &user)
		if err != nil {
			logger.Error("Error: Clerk failed insert the user to the db %v", err)
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to create user"})
		}

		return c.JSON(http.StatusCreated, "success")
	}
}
