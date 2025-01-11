package error




type (
	StripeError struct {
		Code int `json:"code"`
		Message string `json:"message"`
	}
)