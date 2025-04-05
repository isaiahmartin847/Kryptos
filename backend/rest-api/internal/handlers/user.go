package handler

import (
	"fmt"
	"net/http"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/logger"
	"github.com/labstack/echo/v4"
)

func (h *Handler) HasUserAcceptedTerms(c echo.Context) error {
	ctx := c.Request().Context()

	userId := c.QueryParam("userId")

	if userId == "" {
		logger.Error("user id was not provided server is unable to check if terms where checked")
		return c.JSON(http.StatusBadRequest, models.Error{
			Code:    http.StatusBadRequest,
			Message: "The User id provider was not correct",
		})
	}
	// TODO add more userId checking

	AcceptedTerms, err := h.UserService.HasUserAcceptedTerms(ctx, userId)

	if err != nil {
		logger.Error("Unable to get accepted terms err: %v", err)
		return c.JSON(http.StatusInternalServerError, models.Error{
			Code:    http.StatusInternalServerError,
			Message: "There was a problem when getting the accepted terms data",
		})
	}
	c.Response().Header().Set("Cache-Control", "no-store")

	logger.Info(fmt.Sprintf("was able to check if user has signed terms response %v", AcceptedTerms))
	return c.JSON(http.StatusOK, models.ApiResponse[models.UserTerms]{
		Status: "success",
		Data: models.Data[models.UserTerms]{
			Item: AcceptedTerms,
			Meta: models.Meta{Version: "1.0"},
		},
	})

}

func (h *Handler) GetTerm(c echo.Context) error {
	ctx := c.Request().Context()

	latestTerms, err := h.UserService.UserRepo.GetTerm(ctx)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.Error{
			Code:    http.StatusInternalServerError,
			Message: "Unable to fetch the Terms and conditions",
		})
	}

	return c.JSON(http.StatusOK, models.ApiResponse[models.TermsAndConditions]{
		Status: "success",
		Data: models.Data[models.TermsAndConditions]{
			Item: latestTerms,
			Meta: models.Meta{
				Version: "1.0",
			},
		},
	})

}

// this is the endpoint for the clerk webhook for when a user is created
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

func (h *Handler) CreateSignedTerm(c echo.Context) error {
	ctx := c.Request().Context()

	reqBody := &models.SignedTerms{}

	if err := c.Bind(reqBody); err != nil {
		logger.Error("Request body was not correct %v", *reqBody)

		return c.JSON(http.StatusBadRequest, models.Error{
			Code:    http.StatusBadRequest,
			Message: "The data that was in the request body was incorrect",
		})
	}

	logger.Info(fmt.Sprintf("creating signed terms with user id of: %v", reqBody))

	signedTerm, err := h.UserService.UserRepo.CreateSignedTerm(ctx, reqBody)

	if err != nil {
		logger.Error("Unable to create signed terms error: %v", err)
		return c.JSON(http.StatusInternalServerError, models.Error{
			Code:    http.StatusInternalServerError,
			Message: "There was a internal server error",
		})
	}

	logger.Info(fmt.Sprintf("was able to create signed term %v", signedTerm))

	return c.JSON(http.StatusCreated, models.ApiMsgResponse{
		Status:  "success",
		Message: fmt.Sprintf("Created the signed term with the id: %v", signedTerm.ID),
	})

}
