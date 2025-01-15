package handler

import (
	"fmt"
	"log"
	"net/http"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/labstack/echo/v4"
)


func (h *Handler) UserWebhookPayload() echo.HandlerFunc {
	return func(c echo.Context) error {
		payload := &models.WebhookLoginPayload{}
		
		if err := c.Bind(payload); err != nil {
			log.Printf("Error binding the payload: %v", err)
			return err
		}
	
		user := models.User {
			UserID: payload.Data.ID,
			FirstName: payload.Data.FirstName,
			LastName: payload.Data.LastName,
			Email: payload.Data.EmailAddresses[0].EmailAddress,
			CreatedAt: uint64(payload.Data.CreatedAt),
		}
	
		createdUser, err := h.UserService.CreateUser(&user)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to create user"})
		}
	
		fmt.Print(createdUser)
	
		return c.JSON(http.StatusCreated, "success")
	}
}

// func (h *Handler) CreateUserHandler() echo.HandlerFunc {
// 	return func(c echo.Context) error {
// 		var user models.User
// 		if err := c.Bind(&user); err != nil {
// 			return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
// 		}

// 		// Call the service layer to create the user
// 		createdUser, err := h.UserService.CreateUser(&user)
// 		if err != nil {
// 			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Unable to create user"})
// 		}

// 		// Return the created user as the response
// 		return c.JSON(http.StatusCreated, createdUser)
// 	}
// }