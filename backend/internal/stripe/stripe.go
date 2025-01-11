package stripe

import (
	"net/http"

	model "github.com/isaiahmartin847/Reg-Maps/internal/models"

	"github.com/labstack/echo/v4"
)

type Handler struct {}



func (h *Handler) Stripe_transaction(c echo.Context) error {
	transaction := &model.Stripe{}

	if err := c.Bind(transaction); err != nil {
		return err
	}


	return c.JSON(http.StatusCreated, map[string]interface{}{
		"amount": transaction.Amount,
	})

}